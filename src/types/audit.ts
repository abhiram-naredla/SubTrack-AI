export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type ToolEntry = {
  id: string;
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export type AuditInput = {
  teamSize: number;
  useCase: UseCase;
  tools: ToolEntry[];
};

export type AuditRecommendation = {
  tool: string;
  plan: string;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
};

export type AuditResult = {
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: AuditRecommendation[];
};