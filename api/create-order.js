import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
    const website = (process.env.PAYTM_WEBSITE || "DEFAULT").trim();
    const environment = (process.env.PAYTM_ENVIRONMENT || "production").trim();

    const { amount, userId, items, address, shipping } = req.body;

    if (!amount || !userId || !items) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = `ORDR${Date.now()}`;
    const formattedAmount = parseFloat(amount).toFixed(2);

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: mid,
        websiteName: website,
        orderId: orderId,
        callbackUrl: `https://leafburst.in/api/paytm-callback`,
        txnAmount: {
          value: formattedAmount,
          currency: "INR",
        },
        userInfo: {
          custId: userId.replace(/[^a-zA-Z0-9]/g, ""),
        },
        // Store order details in extendInfo or use a database to map orderId to details
        // For standard Blink flow, we pass orderId and retrieve details in callback
      },
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);
    paytmParams.head = {
      signature: checksum,
    };

    const host = environment === "production" ? "securegw.paytm.in" : "securegw-stage.paytm.in";
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.body?.resultInfo?.resultStatus === "S") {
      res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId: orderId,
        mid: mid,
        amount: formattedAmount
      });
    } else {
      res.status(400).json({ 
        error: response.data?.body?.resultInfo?.resultMsg || "Failed to initiate transaction",
        details: response.data?.body?.resultInfo
      });
    }
  } catch (error) {
    console.error("Paytm Init Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
