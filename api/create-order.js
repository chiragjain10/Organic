import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Configuration (Staging for testing)
    const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
    
    const { amount, userId, email, phone } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = "ORD" + Date.now();
    const formattedAmount = parseFloat(amount).toFixed(2);

    // 2. Prepare Paytm Link Payload
    const paytmParams = {
      body: {
        mid: mid,
        linkName: "Order Payment",
        linkDescription: `Payment for Order ${orderId}`,
        linkType: "GENERIC",
        amount: formattedAmount,
        status: "ACTIVE",
        customerMobile: phone || "",
        customerEmail: email || "",
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      },
    };

    // 3. Generate Checksum
    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);
    paytmParams.head = {
      tokenType: "AES",
      signature: checksum,
    };

    // 4. Create Payment Link via Paytm API
    const url = `https://securegw-stage.paytm.in/link/v1/create`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.body?.resultInfo?.resultStatus === "SUCCESS") {
      res.status(200).json({
        shortUrl: response.data.body.shortUrl,
        orderId: orderId,
        amount: formattedAmount
      });
    } else {
      console.error("Paytm Link Error:", response.data?.body?.resultInfo);
      res.status(400).json({ 
        error: response.data?.body?.resultInfo?.resultMsg || "Failed to create payment link",
        details: response.data?.body?.resultInfo
      });
    }
  } catch (error) {
    console.error("Payment Link Crash:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
