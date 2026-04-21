import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mid  = process.env.PAYTM_MERCHANT_ID  || "YTxVaZ24286063946762";
    const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";

    const { amount, email, phone } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    const host = "securegw.paytm.in";
    const websiteName = process.env.PAYTM_WEBSITE || "DEFAULT";
    const callbackUrl = `${process.env.SITE_URL || "https://www.leafburst.in"}/api/paytm-callback`;

    const paytmParams = {
      body: {
        requestType: "Payment",
        mid,
        websiteName,
        orderId,
        callbackUrl,
        txnAmount: {
          value: formattedAmount,
          currency: "INR",
        },
        userInfo: {
          custId: email ? `CUST_${email.replace(/[^a-zA-Z0-9]/g, "_")}` : `CUST_${Date.now()}`,
          email: email || "",
          mobileNo: phone || "9999999999",
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    );

    paytmParams.head = { signature: checksum };

    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    const resultInfo = response.data?.body?.resultInfo;

    if (resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId,
        amount: formattedAmount,
        mid,
      });
    }

    console.error("Paytm initiate failed:", resultInfo);
    return res.status(400).json({
      error: resultInfo?.resultMsg || "Payment initiation failed",
      details: resultInfo,
    });

  } catch (error) {
    const errDetail = error.response?.data || error.message;
    console.error("create-order error:", errDetail);
    return res.status(500).json({
      error: "Internal Server Error",
      details: errDetail,
    });
  }
}