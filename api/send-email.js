export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { to, subject, text } = req.body || {};
    const admin = process.env.ADMIN_EMAIL;
    const recipient = to || admin;
    if (!recipient) {
      res.status(202).json({ status: "no-recipient", message: "ADMIN_EMAIL missing; skipping email" });
      return;
    }
    // Lightweight fallback: use Vercel's built-in fetch with a mail provider webhook if configured.
    // Placeholder implementation—replace with your provider of choice.
    console.log("Email dispatch:", { to: recipient, subject, text });
    res.status(200).json({ status: "queued" });
  } catch (e) {
    res.status(500).json({ error: e.message || "Email dispatch failed" });
  }
}
