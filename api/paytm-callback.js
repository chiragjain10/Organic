import PaytmChecksum from "paytmchecksum";

// Helper: parse application/x-www-form-urlencoded body from raw stream
// (Vercel only auto-parses application/json — Paytm sends form-encoded)
function parseFormBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try {
        const params = Object.fromEntries(new URLSearchParams(data));
        resolve(params);
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";

    // Parse body — handle both JSON-parsed and raw form-encoded
    let body = req.body;
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      body = await parseFormBody(req);
    }

    const { CHECKSUMHASH, ...paytmParams } = body || {};

    console.log("[paytm-callback] Received params:", JSON.stringify(paytmParams));

    if (!CHECKSUMHASH) {
      console.error("[paytm-callback] No checksum received");
      return res.redirect(302, "/?payment=failed&reason=no_checksum");
    }

    // Verify checksum
    const isValid = await PaytmChecksum.verifySignature(paytmParams, mkey, CHECKSUMHASH);
    console.log("[paytm-callback] Checksum valid:", isValid);

    const txnStatus = paytmParams.STATUS;
    const orderId   = paytmParams.ORDERID;
    const txnId     = paytmParams.TXNID;
    const amount    = paytmParams.TXNAMOUNT;

    if (!isValid) {
      console.error("[paytm-callback] Invalid checksum for order:", orderId);
      return res.redirect(302, `/?payment=failed&reason=checksum&order=${orderId}`);
    }

    if (txnStatus === "TXN_SUCCESS") {
      console.log(`[paytm-callback] SUCCESS | Order: ${orderId} | TxnID: ${txnId} | Amount: ${amount}`);
      return res.redirect(302, `/orders?payment=success&order=${orderId}&txn=${txnId}`);
    }

    if (txnStatus === "PENDING") {
      console.warn(`[paytm-callback] PENDING | Order: ${orderId}`);
      return res.redirect(302, `/orders?payment=pending&order=${orderId}`);
    }

    // TXN_FAILURE
    const respMsg = paytmParams.RESPMESSAGE || "Payment failed";
    console.error(`[paytm-callback] FAILED | Order: ${orderId} | Code: ${paytmParams.RESPCODE} | Msg: ${respMsg}`);
    return res.redirect(302, `/?payment=failed&reason=${encodeURIComponent(respMsg)}&order=${orderId}`);

  } catch (error) {
    console.error("[paytm-callback] Exception:", error.message);
    return res.redirect(302, "/?payment=failed&reason=server_error");
  }
}
