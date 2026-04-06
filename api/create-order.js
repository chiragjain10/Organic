import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mid = "YTxVaZ24286063946762";
    const mkey = "s1T8@d5rDD&a%g7k";

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
          custId: email || "CUST_001",
          email: email || "",
          mobile: phone || "",
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

    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("PAYTM INITIATE TRANSACTION RESPONSE:", response.data);

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