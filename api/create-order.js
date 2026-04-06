import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. STRICT STAGING CONFIGURATION
    const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
    const websiteName = "WEBSTAGING";
    const host = "securegw-stage.paytm.in";

    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    // 2. PREPARE PAYLOAD (STRICT STAGING FORMAT)
    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);
    const custId = "CUST" + Date.now(); // Fixed: Generic unique ID instead of Firebase UID

    // Callback must be localhost for staging/local dev as requested
    const callbackUrl = "http://localhost:3000/api/paytm-callback";

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
          custId: custId,
        },
      },
    };

    // 3. GENERATE CHECKSUM
    const bodyString = JSON.stringify(paytmParams.body);
    const checksum = await PaytmChecksum.generateSignature(bodyString, mkey);
    
    paytmParams.head = {
      signature: checksum,
      version: "v1"
    };

    // 4. CALL INITIATE TRANSACTION API
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    console.log("PAYTM STAGING REQUEST:", JSON.stringify(paytmParams));

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("PAYTM STAGING RESPONSE:", JSON.stringify(response.data));

    const resultInfo = response.data?.body?.resultInfo;

    if (resultInfo?.resultStatus === "S") {
      res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId: orderId,
        mid: mid,
        amount: formattedAmount
      });
    } else {
      res.status(400).json({ 
        error: resultInfo?.resultMsg || "System Error from Paytm", 
        details: resultInfo 
      });
    }
  } catch (error) {
    console.error("PAYTM BACKEND CRASH:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Internal Server Error during order initiation", 
      details: error.response?.data || error.message 
    });
  }
}
