import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  // Paytm sends a POST with form-encoded body after payment
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";

    // Paytm sends back the checksum in CHECKSUMHASH
    const { CHECKSUMHASH, ...paytmParams } = req.body;

    // Verify checksum
    const isValid = await PaytmChecksum.verifySignature(
      paytmParams,
      mkey,
      CHECKSUMHASH || ""
    );

    console.log("[paytm-callback] Params:", JSON.stringify(paytmParams));
    console.log("[paytm-callback] Checksum valid:", isValid);

    const txnStatus = paytmParams.STATUS;   // "TXN_SUCCESS" | "TXN_FAILURE" | "PENDING"
    const orderId   = paytmParams.ORDERID;
    const txnId     = paytmParams.TXNID;
    const amount    = paytmParams.TXNAMOUNT;

    if (!isValid) {
      console.error("[paytm-callback] Invalid checksum for order:", orderId);
      // Redirect to failure page with reason
      return res.redirect(302, `/?payment=failed&reason=checksum&order=${orderId}`);
    }

    if (txnStatus === "TXN_SUCCESS") {
      console.log(`[paytm-callback] Payment SUCCESS | Order: ${orderId} | TxnID: ${txnId} | Amount: ${amount}`);
      return res.redirect(302, `/orders?payment=success&order=${orderId}&txn=${txnId}`);
    }

    if (txnStatus === "PENDING") {
      console.warn(`[paytm-callback] Payment PENDING | Order: ${orderId}`);
      return res.redirect(302, `/orders?payment=pending&order=${orderId}`);
    }

    // TXN_FAILURE or unknown
    const respCode = paytmParams.RESPCODE;
    const respMsg  = paytmParams.RESPMESSAGE || "Payment failed";
    console.error(`[paytm-callback] Payment FAILED | Order: ${orderId} | Code: ${respCode} | Msg: ${respMsg}`);
    return res.redirect(302, `/?payment=failed&reason=${encodeURIComponent(respMsg)}&order=${orderId}`);

  } catch (error) {
    console.error("[paytm-callback] Exception:", error.message);
    return res.redirect(302, "/?payment=failed&reason=server_error");
  }
}
