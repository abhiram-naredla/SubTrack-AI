export const AI_TOOLS = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  ChatGPT: ["Plus", "Team", "Enterprise", "API direct"],
  "Anthropic API direct": ["API direct"],
  "OpenAI API direct": ["API direct"],
  Gemini: ["Pro", "Ultra", "API"],
  Windsurf: ["Free", "Pro", "Teams", "Enterprise"],
};

export const BENCHMARK_PRICES: Record<string, Record<string, number>> = {
  Cursor: {
    Hobby: 0,
    Pro: 20,
    Business: 40,
    Enterprise: 60,
  },
  "GitHub Copilot": {
    Individual: 10,
    Business: 19,
    Enterprise: 39,
  },
  Claude: {
    Free: 0,
    Pro: 20,
    Max: 100,
    Team: 30,
    Enterprise: 60,
    "API direct": 0,
  },
  ChatGPT: {
    Plus: 20,
    Team: 30,
    Enterprise: 60,
    "API direct": 0,
  },
  "Anthropic API direct": {
    "API direct": 0,
  },
  "OpenAI API direct": {
    "API direct": 0,
  },
  Gemini: {
    Pro: 20,
    Ultra: 250,
    API: 0,
  },
  Windsurf: {
    Free: 0,
    Pro: 15,
    Teams: 30,
    Enterprise: 60,
  },
};