import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const mid = process.env.PAYTM_MERCHANT_ID;
    const mkey = process.env.PAYTM_MERCHANT_KEY;

    const { amount, email, phone } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    // ✅ PAYMENT LINK PAYLOAD
    const paytmParams = {
      body: {
        mid: mid,
        linkName: `Order ${orderId}`,
        linkDescription: "LeafBurst Order Payment",
        linkType: "GENERIC",
        amount: formattedAmount,
        status: "ACTIVE",
        customerEmail: email || "",
        customerMobile: phone || "",
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    };

    // ✅ CHECKSUM
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    );

    paytmParams.head = {
      tokenType: "AES",
      signature: checksum,
    };

    // ✅ STAGING URL
    const url = "https://securegw-stage.paytm.in/link/v1/create";

    console.log("PAYMENT LINK REQUEST:", paytmParams);

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("PAYMENT LINK RESPONSE:", response.data);

    if (response.data?.body?.resultInfo?.resultStatus === "SUCCESS") {
      return res.status(200).json({
        paymentUrl: response.data.body.shortUrl,
        orderId,
      });
    }

    return res.status(400).json({
      error: response.data?.body?.resultInfo?.resultMsg,
      details: response.data?.body?.resultInfo,
    });

  } catch (error) {
    console.error("PAYMENT LINK ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
}