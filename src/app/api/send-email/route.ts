import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: body.email,
      subject: "Your AI Spend Audit Report",
      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h1>Your AI Spend Audit</h1>

          <p>
            Thanks for using SubTrack AI.
          </p>

          <p>
            Estimated Monthly Savings:
            <strong>$${body.monthlySavings}</strong>
          </p>

          <p>
            Estimated Annual Savings:
            <strong>$${body.annualSavings}</strong>
          </p>

          <p>
            Credex may reach out if your stack qualifies for significant AI infrastructure savings opportunities.
          </p>
        </div>
      `,
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}