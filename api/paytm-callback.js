import PaytmChecksum from "paytmchecksum";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// ─── Firebase init (safe for serverless warm re-use) ─────────────────────────
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyDzZTUGI3a0GaTCapMmC_I4wX3wSRNtZjI",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "organic-c5c79.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "organic-c5c79",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "organic-c5c79.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "28507823597",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:28507823597:web:affeb231804ac516f25be4",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// ─── Helper: parse URL-encoded Paytm POST body ───────────────────────────────
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    // If body is already parsed by Vercel (application/json or form-urlencoded)
    if (req.body && typeof req.body === "object") {
      return resolve(req.body);
    }
    let rawBody = "";
    req.on("data", (chunk) => { rawBody += chunk.toString(); });
    req.on("end", () => {
      try {
        // Paytm sends application/x-www-form-urlencoded
        const params = new URLSearchParams(rawBody);
        const result = {};
        params.forEach((value, key) => { result[key] = value; });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const siteUrl = process.env.SITE_URL || "https://www.leafburst.in";

  try {
    const mkey = process.env.PAYTM_MERCHANT_KEY;
    if (!mkey) {
      console.error("paytm-callback: PAYTM_MERCHANT_KEY not set");
      return res.redirect(302, `${siteUrl}/orders?status=error`);
    }

    const body = await parseBody(req);

    if (!body || !body.CHECKSUMHASH) {
      console.error("Paytm callback: missing CHECKSUMHASH", body);
      return res.redirect(302, `${siteUrl}/orders?status=error`);
    }

    // Verify checksum
    const paytmChecksum = body.CHECKSUMHASH;
    const bodyForVerify = { ...body };
    delete bodyForVerify.CHECKSUMHASH;

    const isValid = PaytmChecksum.verifySignature(bodyForVerify, mkey, paytmChecksum);

    const status = body.STATUS;
    const orderId = body.ORDERID;   // This is our "ORD<timestamp>" ID from create-order
    const txnId = body.TXNID || "";
    const respMsg = body.RESPMSG || "";
    const respCode = body.RESPCODE || "";

    if (!isValid) {
      console.error("Paytm callback: invalid checksum for order", orderId);
      // Do NOT update order — treat as tampered
      return res.redirect(302, `${siteUrl}/orders?status=failed&msg=${encodeURIComponent("Checksum mismatch")}`);
    }

    // ── Update Firestore order status ──────────────────────────────────────
    // The frontend already created the order doc with orderId = Firestore doc ID.
    // The Paytm ORDERID (ORD<timestamp>) is stored as paytmOrderId in the order.
    // Since we can't query by paytmOrderId here without admin SDK, we redirect
    // to the frontend with the result — the frontend's transactionStatus handler
    // (in Checkout.jsx) already handles the Firestore update for popup flow.
    //
    // This callback is the SERVER-SIDE fallback for redirect flow (non-popup).
    // Update: if you store orderId → firestoreDocId mapping (e.g. in a separate
    // lookup collection), you can do the update here. For now we redirect safely.

    if (status === "TXN_SUCCESS") {
      return res.redirect(
        302,
        `${siteUrl}/orders?status=success&orderId=${orderId}&txnId=${txnId}`
      );
    } else {
      return res.redirect(
        302,
        `${siteUrl}/orders?status=failed&msg=${encodeURIComponent(respMsg)}&code=${respCode}`
      );
    }

  } catch (error) {
    console.error("paytm-callback error:", error.message);
    return res.redirect(302, `${siteUrl}/orders?status=error`);
  }
}
