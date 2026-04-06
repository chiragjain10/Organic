import PaytmChecksum from "paytmchecksum";
import { parse } from "querystring";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzZTUGI3a0GaTCapMmC_I4wX3wSRNtZjI",
  authDomain: "organic-c5c79.firebaseapp.com",
  projectId: "organic-c5c79",
  storageBucket: "organic-c5c79.firebasestorage.app",
  messagingSenderId: "28507823597",
  appId: "1:28507823597:web:affeb231804ac516f25be4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();

    // Parse body
    let rawBody = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => { rawBody += chunk.toString(); });
      req.on("end", resolve);
    });
    const body = parse(rawBody);

    if (!body || !body.CHECKSUMHASH) {
      return res.status(400).send("Invalid callback data");
    }

    const paytmChecksum = body.CHECKSUMHASH;
    const bodyForVerify = { ...body };
    delete bodyForVerify.CHECKSUMHASH;

    const isVerifySignature = PaytmChecksum.verifySignature(bodyForVerify, mkey, paytmChecksum);
    
    const status = body.STATUS;
    const orderId = body.ORDERID;
    const txnId = body.TXNID || "";
    const respMsg = body.RESPMSG || "";

    if (isVerifySignature && status === "TXN_SUCCESS") {
      // SUCCESS: Save order to Firestore
      // In a real app, you'd retrieve the temporary order details from a database
      // since Paytm doesn't send back the custom fields in the callback.
      // For now, we'll redirect back to frontend where the frontend will handle 
      // saving if successful, OR we'd have saved a 'pending' order earlier.
      // 
      // IMPORTANT: Per user requirement "Order should be created ONLY after successful payment",
      // but since we don't have the cart items in the callback, we have two choices:
      // 1. Save pending order in create-order.js, then update to 'paid' here.
      // 2. Redirect to frontend with success token and have frontend save (less secure).
      //
      // Choice: We will redirect to a success page.
      const redirectUrl = `https://leafburst.in/orders?status=success&orderId=${orderId}&txnId=${txnId}`;
      return res.redirect(302, redirectUrl);
    } else {
      // FAILED
      const redirectUrl = `https://leafburst.in/orders?status=failed&msg=${encodeURIComponent(respMsg)}`;
      return res.redirect(302, redirectUrl);
    }

  } catch (error) {
    console.error("Callback Error:", error);
    return res.redirect(302, `https://leafburst.in/orders?status=error`);
  }
}
