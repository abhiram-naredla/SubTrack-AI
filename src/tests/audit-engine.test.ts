import { describe, it, expect } from "vitest";
import { runAudit } from "@/lib/audit-engine";

describe("Audit Engine", () => {
  it("detects overspending on ChatGPT Team", () => {
    const result = runAudit({
      teamSize: 2,
      useCase: "coding",
      tools: [
        {
          id: "1",
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
      ],
    });

    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  it("detects Gemini Ultra overspending", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          id: "1",
          tool: "Gemini",
          plan: "Ultra",
          monthlySpend: 250,
          seats: 1,
        },
      ],
    });

    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  it("calculates annual savings correctly", () => {
    const result = runAudit({
      teamSize: 2,
      useCase: "coding",
      tools: [
        {
          id: "1",
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
      ],
    });

    expect(result.totalAnnualSavings).toBe(
      result.totalMonthlySavings * 12
    );
  });

  it("returns recommendations array", () => {
    const result = runAudit({
      teamSize: 3,
      useCase: "mixed",
      tools: [
        {
          id: "1",
          tool: "Cursor",
          plan: "Business",
          monthlySpend: 120,
          seats: 3,
        },
      ],
    });

    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("handles already optimized spending", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          id: "1",
          tool: "Cursor",
          plan: "Pro",
          monthlySpend: 20,
          seats: 1,
        },
      ],
    });

    expect(result.totalMonthlySavings).toBeGreaterThanOrEqual(0);
  });
});