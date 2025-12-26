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
    id: "ucla-zhaoyu-zhang",
    title: "UCLA Quantitative Researcher (REU)",
    org: "Statistical Arbitrage Research (Prof. Zhaoyu Zhang)",
    time: "Nov 2025 → Present",
    bullets: [
      "Conducting applied research on statistical arbitrage in cryptocurrency markets, with a focus on pairs trading under non-stationary conditions",
      "Developed research pipelines for data ingestion, pair selection, signal generation, and walk-forward validation",
      "Implemented cointegration and distance-based similarity methods with rolling recalibration to handle structural breaks",
      "Evaluated robustness across market regimes, volatility shifts, and liquidity conditions, and analyzed overfitting and regime related failure modes",
      "Modeled realistic execution effects including fees, funding rates, slippage, and latency, and assessed performance using risk-adjusted metrics"
    ],
    tags: ["Time Series", "Statistical Arbitrage", "Python", "Validation", "Execution Modeling"]
  },
  {
    id: "mazer-group",
    title: "Quantitative Research Engineer Intern",
    org: "Mazer Group, LLC",
    time: "Jun 2025 → Sep 2025",
    bullets: [
      "Worked on research and software infrastructure for evaluating quantitative models using live, streaming market data",
      "Built monitoring and walkforward evaluation systems to assess model behavior under real world execution conditions",
      "Collaborated with senior researchers on model development, evaluation methodology, and execution logic",
      "Validated proprietary strategies using realistic execution assumptions and risk-aware performance analysis"
    ],
    tags: ["Research Infrastructure", "Monitoring", "Validation", "Python", "Data Systems"]
  }
];


