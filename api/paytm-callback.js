import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const mid = process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762";
  const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";
  
  const body = req.body;
  const paytmChecksum = body.CHECKSUMHASH;
  delete body.CHECKSUMHASH;

  const isVerifySignature = PaytmChecksum.verifySignature(body, mkey, paytmChecksum);
  
  const status = body.STATUS;
  const orderId = body.ORDERID;
  
  const redirectUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/orders?orderId=${orderId}&status=${status}`;

  if (isVerifySignature) {
    res.redirect(302, redirectUrl);
  } else {
    res.redirect(302, `${redirectUrl}&error=checksum_mismatch`);
  }
}
