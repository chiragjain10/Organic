import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const mid = "YTxVaZ24286063946762";
    const mkey = "s1T8@d5rDD&a%g7k";
    const website = "DEFAULT";
    const environment = "production"; // Since it's leafburst.in

    const { amount, userId } = req.body;

    if (!amount || parseFloat(amount) <= 0) {
      return res.status(400).send("Invalid amount");
    }

    const orderId = "LB" + Date.now();
    const custId = userId ? userId.replace(/[^a-zA-Z0-9]/g, "") : "CUST" + Date.now();
    const callbackUrl = `https://leafburst.in/api/paytm-callback`;

    const paytmParams = {
      MID: mid,
      WEBSITE: website,
      INDUSTRY_TYPE_ID: "Retail",
      CHANNEL_ID: "WEB",
      ORDER_ID: orderId,
      CUST_ID: custId,
      TXN_AMOUNT: parseFloat(amount).toFixed(2),
      CALLBACK_URL: callbackUrl,
    };

    const checksum = await PaytmChecksum.generateSignature(paytmParams, mkey);

    const host = environment === "production" ? "securegw.paytm.in" : "securegw-stage.paytm.in";
    const url = `https://${host}/order/process`;

    // Generate an auto-submitting HTML form
    let formHtml = `<html><head><title>Redirecting to Paytm...</title></head><body>`;
    formHtml += `<center><h1>Please do not refresh this page...</h1></center>`;
    formHtml += `<form method="post" action="${url}" name="paytmForm">`;

    for (let key in paytmParams) {
      formHtml += `<input type="hidden" name="${key}" value="${paytmParams[key]}">`;
    }
    formHtml += `<input type="hidden" name="CHECKSUMHASH" value="${checksum}">`;
    formHtml += `</form>`;
    formHtml += `<script type="text/javascript">document.paytmForm.submit();</script>`;
    formHtml += `</body></html>`;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(formHtml);

  } catch (error) {
    console.error("Paytm Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}
