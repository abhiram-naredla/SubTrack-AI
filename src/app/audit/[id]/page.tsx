import { createClient } from "@supabase/supabase-js";

type Recommendation = {
  tool: string;
  plan: string;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);

export default async function AuditPage({ params }: PageProps) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Audit not found.</p>
      </main>
    );
  }

  const recommendations = data.tools?.recommendations || [];
  const monthlySavings = Number(data.estimated_savings || 0);
  const annualSavings = monthlySavings * 12;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-cyan-500/10 border border-emerald-500/30 rounded-3xl p-8 text-center">
          <p className="text-emerald-300 text-sm font-medium">
            Your AI Spend Audit
          </p>

         <h1 className="text-6xl md:text-8xl font-black mt-4 tracking-tight">
            ${monthlySavings.toLocaleString()}/mo
          </h1>

          <p className="text-zinc-300 mt-3">
            Estimated monthly savings
          </p>

          <p className="text-2xl font-semibold mt-4">
            ${annualSavings.toLocaleString()} annual savings
          </p>

          {monthlySavings > 500 && (
            <div className="mt-6 bg-black/50 border border-emerald-500/30 rounded-2xl p-5">
              <p className="font-semibold text-emerald-300">
                High savings opportunity detected
              </p>
              <p className="text-zinc-300 text-sm mt-2">
                Credex may help capture more of this savings through discounted AI infrastructure credits.
              </p>
            </div>
          )}

          {monthlySavings < 100 && (
            <div className="mt-6 bg-black/50 border border-zinc-700 rounded-2xl p-5">
              <p className="font-semibold">
                You’re spending well.
              </p>
              <p className="text-zinc-400 text-sm mt-2">
                We did not manufacture savings. Your current stack looks mostly reasonable.
              </p>
            </div>
          )}
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
  <p className="text-sm text-emerald-400 font-medium">
    AI Generated Summary
  </p>

  <p className="text-zinc-300 mt-3 leading-7">
    Your current AI tooling setup shows opportunities to reduce unnecessary spending while maintaining similar productivity outcomes. Smaller teams using collaboration-focused plans may benefit from downgrading to individual tiers, while high monthly AI infrastructure costs may qualify for discounted credits through Credex. Overall, your stack appears functional but could likely operate more efficiently with better plan alignment and pricing optimization.
  </p>
</div>

        <div className="grid gap-4">
          {recommendations.map((item: Recommendation, index: number) => (
            <div
              key={index}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.tool} — {item.plan}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {item.reason}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-zinc-400 text-sm">
                    Current spend
                  </p>
                  <p className="font-semibold">
                    ${Number(item.currentSpend).toLocaleString()}/mo
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-800 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-emerald-300">
                  {item.recommendedAction}
                </p>

                <p className="font-bold">
                  Save ${Number(item.estimatedSavings).toLocaleString()}/mo
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-zinc-500 text-sm">
  Audits are generated instantly and based on publicly verified pricing benchmarks.
</div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <p className="font-semibold">
            Share this audit
          </p>
          <p className="text-zinc-400 text-sm mt-2">
            This public URL contains only tools and savings numbers. Email and company details are not shown.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-5">
  <div>
    <p className="text-2xl font-bold">
      Get the full audit report
    </p>

    <p className="text-zinc-400 mt-2">
      Receive your audit summary and future optimization alerts.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-4">
    <input
      placeholder="Email address"
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
    />

    <input
      placeholder="Company name (optional)"
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
    />

    <input
      placeholder="Role (optional)"
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
    />

    <input
      placeholder="Team size (optional)"
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
    />
  </div>

  <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold">
    Email me this audit
  </button>
</div>

      </section>
    </main>
  );
}
