import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  // Paytm sends POST callback
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const mid = process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762";
  const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";
  
  const body = req.body || {};
  if (!body || Object.keys(body).length === 0) {
    // Some environments need to parse the body manually if not using a body-parser
    // But for Vercel/Node standard, it should be in req.body
    return res.status(400).send("Empty response from Paytm");
  }

  const paytmChecksum = body.CHECKSUMHASH;
  delete body.CHECKSUMHASH;

  const isVerifySignature = PaytmChecksum.verifySignature(body, mkey, paytmChecksum);
  
  const status = body.STATUS;
  const orderId = body.ORDERID;
  const bankTxnId = body.BANKTXNID || "";
  const txnId = body.TXNID || "";

  console.log("Paytm Callback Data:", JSON.stringify(body));

  // The redirect URL should be your frontend order confirmation page
  const redirectUrl = `https://leafburst.in/orders?orderId=${orderId}&status=${status}&txnId=${txnId}`;

  if (isVerifySignature) {
    res.redirect(302, redirectUrl);
  } else {
    res.redirect(302, `${redirectUrl}&error=checksum_mismatch`);
  }
}
