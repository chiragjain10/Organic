import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ STAGING CONFIG
    const mid = process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762";
    const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k"; // 🔐 MUST be in .env
    const websiteName = "WEBSTAGING";
    const host = "securegw-stage.paytm.in";

    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    // ✅ GENERATE VALUES
    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);
    const custId = "CUST" + Date.now();

    // ✅ STAGING CALLBACK (IMPORTANT)
    const callbackUrl = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`;

    // ✅ PAYLOAD
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

    // ✅ CHECKSUM
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    );

    paytmParams.head = {
      signature: checksum, // ❌ NO version here
    };

    // ✅ API URL
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    console.log("PAYTM REQUEST:", JSON.stringify(paytmParams, null, 2));

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("PAYTM RESPONSE:", JSON.stringify(response.data, null, 2));

    const resultInfo = response.data?.body?.resultInfo;

    // ✅ SUCCESS
    if (resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId: orderId,
        mid: mid,
        amount: formattedAmount,
      });
    }

    // ❌ FAILURE
    return res.status(400).json({
      error: resultInfo?.resultMsg || "Paytm Error",
      details: resultInfo,
    });

  } catch (error) {
    console.error("PAYTM ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
}