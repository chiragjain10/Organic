import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
    
    const website = "DEFAULT"; 
    const environment = "production"; 

    const { amount } = req.body || {};
    // Generate a shorter, unique Order ID (e.g., LB1712345678)
    const receipt = `LB${Math.floor(Date.now() / 1000)}`;

    if (!amount || parseFloat(amount) <= 0) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }

    const formattedAmount = Number(amount).toFixed(2);

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: mid,
        websiteName: website,
        orderId: receipt,
        callbackUrl: `https://leafburst.in/api/paytm-callback`,
        txnAmount: {
          value: formattedAmount,
          currency: "INR",
        },
        userInfo: {
          custId: "CUST_" + Math.floor(Math.random() * 1000000),
        },
        industryTypeId: "Retail",
        channelId: "WEB",
      },
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);
    paytmParams.head = {
      signature: checksum,
    };

    console.log("Sending to Paytm:", JSON.stringify({ ...paytmParams, head: { signature: "REDACTED" } }));

    const host = environment === "production" ? "securegw.paytm.in" : "securegw-stage.paytm.in";
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${receipt}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Paytm Response:", JSON.stringify(response.data));

    if (response.data?.body?.resultInfo?.resultStatus === "S") {
      res.status(200).json({
        orderId: receipt,
        txnToken: response.data.body.txnToken,
        amount: amount,
        mid: mid,
      });
    } else {
      const msg = response.data?.body?.resultInfo?.resultMsg || "Unknown error from Paytm";
      res.status(400).json({ error: msg, details: response.data?.body?.resultInfo });
    }
  } catch (e) {
    console.error("Internal Server Error:", e.response?.data || e.message);
    res.status(500).json({ 
      error: "Internal Server Error during order creation", 
      details: e.response?.data || e.message 
    });
  }
}
