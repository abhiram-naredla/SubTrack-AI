"use client";

import { useEffect, useState } from "react";
import { AI_TOOLS } from "@/data/tools";
import { runAudit } from "@/lib/audit-engine";
import { AuditInput, ToolEntry, UseCase } from "@/types/audit";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "subtrack-ai-form";

export default function Home() {
  const [teamSize, setTeamSize] = useState(3);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [tools, setTools] = useState<ToolEntry[]>([
    {
      id: crypto.randomUUID(),
      tool: "ChatGPT",
      plan: "Team",
      monthlySpend: 90,
      seats: 3,
    },
  ]);

  useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    setTimeout(() => {
      setTeamSize(parsed.teamSize || 3);
      setUseCase(parsed.useCase || "coding");
      setTools(parsed.tools || []);
    }, 0);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}, []);
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ teamSize, useCase, tools })
    );
  }, [teamSize, useCase, tools]);

  function updateTool(id: string, field: keyof ToolEntry, value: string | number) {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, [field]: value } : tool
      )
    );
  }

  function addTool() {
    setTools((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        tool: "Cursor",
        plan: "Pro",
        monthlySpend: 20,
        seats: 1,
      },
    ]);
  }

  function removeTool(id: string) {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  }

  async function handleAudit() {
    const input: AuditInput = {
      teamSize,
      useCase,
      tools,
    };

    const result = runAudit(input);

    const { data, error } = await supabase
      .from("audits")
      .insert({
        tools: {
          input,
          recommendations: result.recommendations,
        },
        total_monthly_spend: result.totalMonthlySpend,
        estimated_savings: result.totalMonthlySavings,
        summary: null,
      })
      .select("id")
      .single();

    if (error) {
      alert("Error saving audit. Check Supabase connection.");
      console.error(error);
      return;
    }

    window.location.href = `/audit/${data.id}`;
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <p className="text-sm text-emerald-400 font-medium">
            Free AI Spend Audit
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            Stop Overspending on AI Tools
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Enter your AI stack and get an instant audit showing where your startup can save money.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <label htmlFor="team-size" className="text-sm text-zinc-300">
  Team size
</label>
              <input
                type="number"
                min="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
              />
            </label>

            <label className="space-y-2">
              <label htmlFor="use-case" className="text-sm text-zinc-300">
  Primary use case
</label>
              <select
  id="use-case"
  name="useCase"
  value={useCase}
                onChange={(e) => setUseCase(e.target.value as UseCase)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            {tools.map((item) => (
              <div
                key={item.id}
                className="grid md:grid-cols-5 gap-3 bg-black border border-zinc-800 rounded-xl p-4"
              >
                <select
                  value={item.tool}
                  onChange={(e) => {
                    const selectedTool = e.target.value;
                    const firstPlan = AI_TOOLS[selectedTool as keyof typeof AI_TOOLS][0];

                    setTools((prev) =>
                      prev.map((tool) =>
                        tool.id === item.id
                          ? { ...tool, tool: selectedTool, plan: firstPlan }
                          : tool
                      )
                    );
                  }}
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
                >
                  {Object.keys(AI_TOOLS).map((tool) => (
                    <option key={tool}>{tool}</option>
                  ))}
                </select>

                <select
                  value={item.plan}
                  onChange={(e) => updateTool(item.id, "plan", e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
                >
                  {AI_TOOLS[item.tool as keyof typeof AI_TOOLS].map((plan) => (
                    <option key={plan}>{plan}</option>
                  ))}
                </select>

                <input
                  type="number"
                  min="0"
                  value={item.monthlySpend}
                  onChange={(e) =>
                    updateTool(item.id, "monthlySpend", Number(e.target.value))
                  }
                  placeholder="Monthly spend"
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
                />

                <input
                  type="number"
                  min="1"
                  value={item.seats}
                  onChange={(e) =>
                    updateTool(item.id, "seats", Number(e.target.value))
                  }
                  placeholder="Seats"
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
                />

                <button
                  type="button"
                  onClick={() => removeTool(item.id)}
                  className="border border-zinc-700 rounded-lg px-3 py-2 text-zinc-300 hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={addTool}
              className="border border-zinc-700 px-5 py-3 rounded-xl"
            >
              Add another tool
            </button>

            <button
              type="button"
              onClick={handleAudit}
              className="bg-white text-black px-5 py-3 rounded-xl font-semibold"
            >
              Run free audit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
