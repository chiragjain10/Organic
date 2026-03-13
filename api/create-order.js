export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      res.status(400).json({ error: "Razorpay credentials missing" });
      return;
    }
    const { amount, currency = "INR", receipt = `rcpt_${Date.now()}`, notes = {} } = req.body || {};
    if (!amount || amount <= 0) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }
    const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency, receipt, notes }),
    });
    const data = await response.json();
    if (response.status >= 400) {
      res.status(response.status).json({ error: data });
      return;
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message || "Order creation failed" });
  }
}
