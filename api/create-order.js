export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const merchant_id = process.env.PAYTM_MERCHANT_ID;
    const merchant_key = process.env.PAYTM_MERCHANT_KEY;
    if (!merchant_id || !merchant_key) {
      res.status(400).json({ error: "Paytm credentials missing" });
      return;
    }
    const { amount, currency = "INR", receipt = `rcpt_${Date.now()}`, notes = {} } = req.body || {};
    if (!amount || amount <= 0) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }
    
    // Mock Paytm token response
    const data = {
      orderId: receipt,
      txnToken: "mock_txn_token_" + Date.now(),
      amount: amount
    };
    
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message || "Order creation failed" });
  }
}
