import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
    const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
    
    // Website name from your dashboard screenshot
    const website = (process.env.PAYTM_WEBSITE || "DEFAULT").trim(); 
    // Merchant ID looks like a production ID
    const environment = (process.env.PAYTM_ENVIRONMENT || "production").trim(); 

    const { amount, notes = {} } = req.body || {};

    // 1. Validate Amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    // 2. Generate Unique IDs
    // Order ID must be unique. LB prefix + timestamp
    const receipt = `LB${Date.now()}`;
    // Customer ID: simple alphanumeric
    const customerId = notes.userId ? notes.userId.replace(/[^a-zA-Z0-9]/g, "") : `CUST${Date.now()}`;

    // 3. Format Amount to 2 decimal places as a string
    const formattedAmount = Number(amount).toFixed(2);

    // 4. Prepare Paytm Request Body
    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: mid,
        websiteName: website,
        orderId: receipt,
        callbackUrl: `https://leafburst.in/api/paytm-callback`,
        txnAmount: {
          value: formattedAmount,
          currency: "INR",
        },
        userInfo: {
          custId: customerId,
        },
      },
    };

    // Note: IndustryType and ChannelId are often NOT needed in initiateTransaction body v1
    // but if 501 persists, they can be added to the body or head.

    // 5. Generate Checksum
    const bodyString = JSON.stringify(paytmParams.body);
    const checksum = await PaytmChecksum.generateSignature(bodyString, mkey);
    
    paytmParams.head = {
      signature: checksum,
    };

    // 6. Call Paytm API
    const host = environment === "production" ? "securegw.paytm.in" : "securegw-stage.paytm.in";
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${receipt}`;

    console.log("Paytm Request Payload:", JSON.stringify(paytmParams));

    const response = await axios.post(url, paytmParams, {
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });

    console.log("Paytm API Response:", JSON.stringify(response.data));

    const resultInfo = response.data?.body?.resultInfo;

    if (resultInfo?.resultStatus === "S") {
      res.status(200).json({
        orderId: receipt,
        txnToken: response.data.body.txnToken,
        amount: formattedAmount,
        mid: mid,
        environment: environment
      });
    } else {
      res.status(400).json({ 
        error: resultInfo?.resultMsg || "Paytm initiation failed", 
        details: resultInfo,
        sent_body: paytmParams.body 
      });
    }
  } catch (e) {
    console.error("Critical Error in create-order:", e.response?.data || e.message);
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: e.response?.data || e.message 
    });
  }
}
