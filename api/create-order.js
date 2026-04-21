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

    const orderId         = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    const host           = "securegw.paytm.in";
    const websiteName    = process.env.PAYTM_WEBSITE       || "DEFAULT";
    const industryTypeId = process.env.PAYTM_INDUSTRY_TYPE || "Retail";
    const channelId      = process.env.PAYTM_CHANNEL_ID    || "WEB";
    const callbackUrl    = `${process.env.SITE_URL || "https://www.leafburst.in"}/api/paytm-callback`;

    const paytmBody = {
      requestType : "Payment",
      mid,
      websiteName,
      industryTypeId,       // Required for Retail merchants
      channelId,            // WEB for browser-based payments
      orderId,
      callbackUrl,
      txnAmount: {
        value   : formattedAmount,
        currency: "INR",
      },
      userInfo: {
        custId  : "CUST" + Date.now(),   // simple numeric — guaranteed Paytm-safe
        mobileNo: phone || "9999999999",
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      mkey
    );

    const paytmParams = {
      head: { signature: checksum },
      body: paytmBody,
    };

    console.log("[create-order] Initiating transaction:", {
      mid,
      websiteName,
      industryTypeId,
      channelId,
      orderId,
      amount: formattedAmount,
      callbackUrl,
    });

    const url      = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;
    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
      timeout: 12000,
    });

    // Log full raw Paytm response — visible in Vercel → Functions → Logs
    console.log("[create-order] Paytm raw response:", JSON.stringify(response.data));

    const resultInfo = response.data?.body?.resultInfo;

    if (resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken: response.data.body.txnToken,
        orderId,
        amount  : formattedAmount,
        mid,
      });
    }

    // Surface the actual Paytm code + message for debugging
    console.error("[create-order] Paytm rejected:", resultInfo);
    return res.status(400).json({
      error     : resultInfo?.resultMsg  || "Payment initiation failed",
      resultCode: resultInfo?.resultCode || "UNKNOWN",
      details   : resultInfo,
    });

  } catch (error) {
    const errDetail = error.response?.data || error.message;
    console.error("[create-order] Exception:", JSON.stringify(errDetail));
    return res.status(500).json({
      error  : "Internal Server Error",
      details: errDetail,
    });
  }
}