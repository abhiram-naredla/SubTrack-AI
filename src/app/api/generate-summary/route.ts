import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI infrastructure cost consultant helping startups reduce overspending on AI tools. Keep responses concise, practical, and financially grounded.",
        },
        {
          role: "user",
          content: `
Team Size: ${body.teamSize}
Use Case: ${body.useCase}

Audit Recommendations:
${JSON.stringify(body.recommendations)}

Write a concise 100-word summary explaining:
- where they are overspending
- biggest optimization opportunities
- whether Credex could help
- overall financial efficiency
`,
        },
      ],
    });

    return Response.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      summary:
        "Your AI stack has several potential optimization opportunities. Some plans appear oversized for your current team structure, and there may be opportunities to reduce retail AI infrastructure costs.",
    });
  }
}