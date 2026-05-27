import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const teamSize =
      body.teamSize && body.teamSize !== ""
        ? Number(body.teamSize)
        : null;

    const { error } = await supabase.from("leads").insert({
      email: body.email,
      company_name: body.companyName || null,
      role: body.role || null,
      team_size: teamSize,
    });

    if (error) {
      throw error;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}