import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"SubTrack AI" <${process.env.GMAIL_USER}>`,
      to: body.email,
      subject: "Your AI Spend Audit Report",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Your AI Spend Audit</h1>
          <p>Thanks for using SubTrack AI.</p>
          <p>Estimated Monthly Savings: <strong>$${body.monthlySavings}</strong></p>
          <p>Estimated Annual Savings: <strong>$${body.annualSavings}</strong></p>
          <p>Credex may reach out if your stack qualifies for significant AI infrastructure savings opportunities.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}