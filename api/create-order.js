import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mid  = process.env.PAYTM_MERCHANT_ID;
    const mkey = process.env.PAYTM_MERCHANT_KEY;

    if (!mid || !mkey) {
      return res.status(500).json({ error: "Paytm credentials not configured" });
    }

    const { amount, phone } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId         = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Use staging gateway for test/dev, production for live
    const isStaging  = process.env.PAYTM_ENVIRONMENT === "staging";
    const host        = isStaging ? "securegw-stage.paytm.in" : "securegw.paytm.in";
    const websiteName = process.env.PAYTM_WEBSITE || (isStaging ? "WEBSTAGING" : "DEFAULT");

    console.log("[create-order] Environment:", isStaging ? "STAGING" : "PRODUCTION");
    const callbackUrl = `${process.env.SITE_URL || "https://www.leafburst.in"}/api/paytm-callback`;

    // ── Strictly minimal body per Paytm initiateTransaction v1 spec ──────────
    // Do NOT add extra fields (industryTypeId, channelId, email, etc.) here.
    // Extra fields are not recognised by this API and cause error 501.
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

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      mkey
    );

    const paytmParams = {
      head: { signature: checksum },
      body: paytmBody,
    };

    console.log("[create-order] Gateway:", host);
    console.log("[create-order] Params:", JSON.stringify({
      mid, websiteName, orderId, amount: formattedAmount, callbackUrl,
    }));

    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
      timeout: 12000,
    });

    // Full Paytm response visible in Vercel → Functions → Logs
    console.log("[create-order] Paytm response:", JSON.stringify(response.data));

    const resultInfo = response.data?.body?.resultInfo;

    if (resultInfo?.resultStatus === "S") {
      return res.status(200).json({
        txnToken : response.data.body.txnToken,
        orderId,
        amount   : formattedAmount,
        mid,
        paytmHost: host,   // ← tells frontend which gateway JS to load
      });
    }

    // Return resultCode so frontend alert shows: "System Error [Code: 501]"
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