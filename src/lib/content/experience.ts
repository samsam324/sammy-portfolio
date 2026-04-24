export type ExperienceItem = {
  id: string;
  title: string;
  org: string;
  time: string;
  bullets: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "flow-traders-ascent",
    title: "Ascent Participant",
    org: "Flow Traders",
    time: "Expected May 2026",
    bullets: [
      "Selected as one of 18 students for Flow Traders Ascent, a program focused on trading, research, and collaboration",
      "Will participate in an algorithmic trading competition, poker tournament, and logic puzzles over two days"
    ],
    tags: []
  },
  {
    id: "prizepicks",
    title: "Software Engineer Intern",
    org: "PrizePicks",
    time: "Expected Jun 2026 → Sep 2026",
    bullets: [
      "Incoming backend intern on the engineering team",
    ],
    tags: []
  },
  {
    id: "ucla-zhaoyu-zhang",
    title: "UCLA Research Assistant",
    org: "Statistical Arbitrage Research with Dr. Mihai Cucuringu",
    time: "Nov 2025 → Present",
    bullets: [
      "Research on statistical arbitrage in crypto pairs trading under regime shifts and structural breaks",
      "Built end-to-end pipeline for data, pair selection, signals and walk-forward validation with rolling recalibration",
      "Develop a Mixture of Experts with Hidden Markov Model gating and XGBoost timing for long/short per pair",
      "Benchmark Mixture of Experts against rule-based strategies under trading costs: fees, funding, slippage, latency"
    ],
    tags: ["Python", "Pandas", "XGBoost", "hmmlearn", "statsmodels"]
  },
  {
    id: "mazer-group",
    title: "Quantitative Research Engineer Intern",
    org: "Mazer Group, LLC",
    time: "Jun 2025 → Sep 2025",
    bullets: [
      "Utilized $1,000,000 of trading capital to develop and validate proprietary strategies in live financial markets",
      "Collaborated with hedge fund manager on research and execution of algorithmic models",
      "Achieved 18.3% CAGR with 1.28 Sharpe and 8.1% max drawdown in live trading under real market execution"
    ],
    tags: ["Python", "Pandas", "NumPy", "statsmodels"]
  }
];


