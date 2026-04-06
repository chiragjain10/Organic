import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let mid = process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762";
    let mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";
    
    // Optional: Firebase functions config check if running in Firebase Cloud Functions natively
    if (process.env.FUNCTIONS_EMULATOR || process.env.GCLOUD_PROJECT) {
      try {
        const functions = require("firebase-functions");
        if (functions.config().paytm) {
          mid = functions.config().paytm.mid || mid;
          mkey = functions.config().paytm.key || mkey;
        }
      } catch (e) {
        // Ignore require error if firebase-functions isn't available
      }
    }

    console.log("MID:", mid); // Temporary debug log

    const { amount, email, phone } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    const host = "securegw.paytm.in";
    const websiteName = "DEFAULT";
    const callbackUrl = "https://www.leafburst.in/api/paytm-callback";

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: mid,
        websiteName: websiteName,
        orderId: orderId,
        callbackUrl: callbackUrl,
        txnAmount: {
          value: formattedAmount,
          currency: "INR",
        },
        userInfo: {
          custId: "CUST" + Date.now(),
          mobileNo: phone || "9999999999",
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    );

    paytmParams.head = {
      signature: checksum,
    };

    console.log("PAYTM PARAMS:", JSON.stringify(paytmParams));

    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("PAYTM INITIATE TRANSACTION RESPONSE:", JSON.stringify(response.data));

    if (response.data?.body?.resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId: orderId,
        amount: formattedAmount,
        mid: mid,
      });
    }

    return res.status(400).json({
      error: response.data?.body?.resultInfo?.resultMsg,
      details: response.data?.body?.resultInfo,
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
}