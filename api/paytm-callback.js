import PaytmChecksum from "paytmchecksum";
import { parse } from "querystring";

export default async function handler(req, res) {
  // Paytm sends a POST request with form-urlencoded body
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const mid = "YTxVaZ24286063946762";
    const mkey = "s1T8@d5rDD&a%g7k";

    // Vercel might have already parsed the body
    let body = req.body;

    // If body is not parsed, read it from the stream
    if (!body || Object.keys(body).length === 0) {
      let rawBody = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          rawBody += chunk.toString();
        });
        req.on("end", resolve);
      });
      body = parse(rawBody);
    }

    console.log("Paytm Raw Body:", JSON.stringify(body));

    if (!body || !body.CHECKSUMHASH) {
      // If we still don't have a body or checksum, redirect to orders with error
      return res.redirect(302, "https://leafburst.in/orders?status=error&msg=no_data");
    }

    const paytmChecksum = body.CHECKSUMHASH;
    const bodyForVerify = { ...body };
    delete bodyForVerify.CHECKSUMHASH;

    const isVerifySignature = PaytmChecksum.verifySignature(bodyForVerify, mkey, paytmChecksum);
    
    const status = body.STATUS;
    const orderId = body.ORDERID;
    const txnId = body.TXNID || "";

    console.log("Paytm Status:", status, "OrderID:", orderId);

    // Redirect back to the frontend orders page with status
    const redirectUrl = `https://leafburst.in/orders?orderId=${orderId}&status=${status}&txnId=${txnId}`;
    
    return res.redirect(302, isVerifySignature ? redirectUrl : `${redirectUrl}&error=checksum_mismatch`);

  } catch (error) {
    console.error("Callback Crash:", error);
    // Don't show "Callback processing failed" as an error page, instead redirect with error info
    return res.redirect(302, `https://leafburst.in/orders?status=error&error_msg=${encodeURIComponent(error.message)}`);
  }
}
