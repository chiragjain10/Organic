import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Credentials ────────────────────────────────────────────────────────────
    const mid  = process.env.PAYTM_MERCHANT_ID  || "YTxVaZ24286063946762";
    const mkey = process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k";

    // ── Gateway ────────────────────────────────────────────────────────────────
    const isStaging   = (process.env.PAYTM_ENV || "production") === "staging";
    const host        = isStaging ? "securegw-stage.paytm.in" : "securegw.paytm.in";
    const websiteName = isStaging ? "WEBSTAGING" : (process.env.PAYTM_WEBSITE || "DEFAULT");

    const { amount, phone } = req.body || {};

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId         = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);
    const callbackUrl     = `${process.env.SITE_URL || "https://www.leafburst.in"}/api/paytm-callback`;

    console.log("[create-order] Host:", host, "| MID:", mid, "| Website:", websiteName, "| Amount:", formattedAmount);

    // ── Request Body ───────────────────────────────────────────────────────────
    const paytmBody = {
      requestType: "Payment",
      mid,
      websiteName,
      orderId,
      callbackUrl,
      txnAmount: {
        value   : formattedAmount,
        currency: "INR",
      },
      userInfo: {
        custId  : "CUST" + Date.now(),
        mobileNo: phone || "9999999999",
      },
    };

    // Generate checksum from body object
    const checksumHash = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      mkey
    );

    // ── Build Paytm params ─────────────────────────────────────────────────────
    const paytmParams = {
      head: {
        version: "v1",
        channelId: "WEB",
        signature: checksumHash
      },
      body: paytmBody,
    };

    console.log("[create-order] Final Payload:", JSON.stringify(paytmParams));

    console.log("[create-order] Sending to Paytm:", JSON.stringify({
      url: `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
      mid, websiteName, orderId, amount: formattedAmount,
    }));

    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    const resultInfo = response.data?.body?.resultInfo;
    console.log("[create-order] Paytm resultInfo:", JSON.stringify(resultInfo));

    if (resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken : response.data.body.txnToken,
        orderId,
        amount   : formattedAmount,
        mid,
        paytmHost: host,
      });
    }

    // Paytm rejected — log full response for debugging
    console.error("[create-order] REJECTED | Code:", resultInfo?.resultCode, "| Msg:", resultInfo?.resultMsg);
    console.error("[create-order] Full body:", JSON.stringify(response.data?.body));

    return res.status(400).json({
      error     : `${resultInfo?.resultMsg || "Payment initiation failed"} [Code: ${resultInfo?.resultCode || "?"}]`,
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