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

    // Manually parse the body because Vercel doesn't always parse form-urlencoded automatically
    let rawBody = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => {
        rawBody += chunk.toString();
      });
      req.on("end", resolve);
    });

    const body = parse(rawBody);

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).send("No callback data received from Paytm");
    }

    const paytmChecksum = body.CHECKSUMHASH;
    delete body.CHECKSUMHASH;

    const isVerifySignature = PaytmChecksum.verifySignature(body, mkey, paytmChecksum);
    
    const status = body.STATUS;
    const orderId = body.ORDERID;
    const txnId = body.TXNID || "";

    console.log("Paytm Status:", status, "OrderID:", orderId);

    // Redirect back to the frontend orders page with status
    const redirectUrl = `https://leafburst.in/orders?orderId=${orderId}&status=${status}&txnId=${txnId}`;
    
    res.setHeader("Location", redirectUrl);
    res.status(302).send("");

  } catch (error) {
    console.error("Callback Crash:", error);
    res.status(500).send("Callback processing failed");
  }
}
