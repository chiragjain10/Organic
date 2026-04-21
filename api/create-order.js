import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Staging test credentials (fallback if env vars not set on Vercel)
    const mid  = process.env.PAYTM_MERCHANT_ID  || "UjGKLV74032327857279";
    const mkey = process.env.PAYTM_MERCHANT_KEY || "1hYpihoEUbOx9Ct1";

    const { amount, phone } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId         = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Use staging gateway if using test MID or if environment is set to staging
    const isTestMid = mid === "UjGKLV74032327857279";
    const isStaging = isTestMid || (process.env.PAYTM_ENVIRONMENT || "staging") !== "production";
    
    const host        = isStaging ? "securegw-stage.paytm.in" : "securegw.paytm.in";
    const websiteName = process.env.PAYTM_WEBSITE || (isStaging ? "WEBSTAGING" : "DEFAULT");

    console.log("[create-order] Host:", host, "MID:", mid);
    const callbackUrl = `${process.env.SITE_URL || "https://www.leafburst.in"}/api/paytm-callback`;

    // ── Request Body ──────────────────────────────────────────────────────────
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

    // Staging accounts often require these fields
    if (isStaging) {
      paytmBody.industryTypeId = "Retail";
      paytmBody.channelId      = "WEB";
    }

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