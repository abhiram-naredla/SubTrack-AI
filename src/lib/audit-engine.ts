import { AuditInput, AuditResult } from "@/types/audit";
import { BENCHMARK_PRICES } from "@/data/tools";

export function runAudit(input: AuditInput): AuditResult {
  const recommendations = input.tools.map((item) => {
    const currentSpend = Number(item.monthlySpend || 0);
    let estimatedSavings = 0;
    let recommendedAction = "Keep current plan";
    let reason = "This plan appears reasonable for your current team size and use case.";

    const benchmarkPrice = BENCHMARK_PRICES[item.tool]?.[item.plan];

    if (benchmarkPrice !== undefined && benchmarkPrice > 0) {
      const expectedSpend = benchmarkPrice * item.seats;

      if (currentSpend > expectedSpend) {
        estimatedSavings = currentSpend - expectedSpend;
        recommendedAction = `Review billing. Expected spend is around $${expectedSpend}/mo.`;
        reason = `Your reported spend is higher than the public benchmark price for ${item.plan}.`;
      }
    }

    if ((item.tool === "ChatGPT" || item.tool === "Claude") && item.plan === "Team" && item.seats <= 2) {
      const cheaperPlanPrice = 20 * item.seats;
      const savings = Math.max(0, currentSpend - cheaperPlanPrice);

      if (savings > estimatedSavings) {
        estimatedSavings = savings;
        recommendedAction = "Downgrade to individual Pro/Plus plan";
        reason = "Team plans are usually unnecessary for 1–2 users unless collaboration/admin controls are required.";
      }
    }

    if (item.tool === "Gemini" && item.plan === "Ultra" && input.useCase !== "research") {
      const cheaperPlanPrice = 20 * item.seats;
      const savings = Math.max(0, currentSpend - cheaperPlanPrice);

      if (savings > estimatedSavings) {
        estimatedSavings = savings;
        recommendedAction = "Downgrade from Ultra to Pro";
        reason = "Ultra pricing is hard to justify unless your main use case depends on advanced research-heavy workflows.";
      }
    }

    if (currentSpend >= 500) {
      const creditSavings = Math.round(currentSpend * 0.25);

      if (creditSavings > estimatedSavings) {
        estimatedSavings = creditSavings;
        recommendedAction = "Explore discounted AI credits through Credex";
        reason = "Large monthly AI spend may qualify for savings through discounted infrastructure credits.";
      }
    }

    return {
      tool: item.tool,
      plan: item.plan,
      currentSpend,
      recommendedAction,
      estimatedSavings,
      reason,
    };
  });

  const totalMonthlySpend = recommendations.reduce((sum, r) => sum + r.currentSpend, 0);
  const totalMonthlySavings = recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0);

  return {
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    recommendations,
  };
}