import PaytmChecksum from "paytmchecksum";
import axios from "axios";

export default async function handler(req, res) {
  const mid = (process.env.PAYTM_MERCHANT_ID || "YTxVaZ24286063946762").trim();
  const mkey = (process.env.PAYTM_MERCHANT_KEY || "s1T8@d5rDD&a%g7k").trim();
  const website = (process.env.PAYTM_WEBSITE || "DEFAULT").trim();
  const environment = (process.env.PAYTM_ENVIRONMENT || "production").trim();

  const receipt = `TEST_${Date.now()}`;
  const formattedAmount = "1.00";

  const paytmParams = {
    body: {
      requestType: "Payment",
      mid: mid,
      websiteName: website,
      orderId: receipt,
      callbackUrl: "https://leafburst.in/api/paytm-callback",
      txnAmount: {
        value: formattedAmount,
        currency: "INR",
      },
      userInfo: {
        custId: "TEST_CUST_001",
      },
    },
  };

  try {
    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);
    paytmParams.head = { signature: checksum };

    const host = environment === "production" ? "securegw.paytm.in" : "securegw-stage.paytm.in";
    const url = `https://${host}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${receipt}`;

    const response = await axios.post(url, paytmParams, {
      headers: { "Content-Type": "application/json" }
    });

    res.status(200).json({
      message: "Paytm Test Route",
      request: paytmParams,
      response: response.data
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      details: e.response?.data
    });
  }
}
