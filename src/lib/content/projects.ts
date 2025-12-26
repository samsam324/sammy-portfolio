export type Project = {
  id: string;
  title: string;
  oneLiner: string;
  stack: string[];
  metrics: string[];
  image: { src: string; alt: string };
  links: { label: string; href: string }[];
  featured?: boolean;
  caseStudy?: {
    problem: string;
    approach: string[];
    results: string[];
    techNotes: string[];
  };
};

export const projects: Project[] = [
  {
    id: "risk-robustness-toolkit",
    title: "Risk & Robustness Analysis Toolkit",
    oneLiner:
      "A diagnostic framework for stress testing quantitative strategies and identifying fragility under noise, regime shifts, and adverse conditions.",
    stack: [
      "Python",
      "NumPy",
      "Monte Carlo Simulation",
      "Risk Metrics",
      "Statistical Testing",
    ],
    metrics: [
      "Execution adjusted risk metrics such as Sharpe, Sortino, Calmar, and drawdown",
      "Robustness diagnostics across noise, drift, and stress scenarios"
    ],
    image: { src: "/images/risk_toolkit.png", alt: "Risk Toolkit" },
    links: [],
    featured: true,
    caseStudy: {
      problem:
        "Most backtests look good until they fail in deployment. The goal was to build a toolkit that surfaces fragility early by stress-testing strategies beyond their in sample assumptions.",
      approach: [
        "Implemented a unified evaluation layer computing risk adjusted metrics including Sharpe, Sortino, Calmar, and drawdown profiles.",
        "Built Monte Carlo simulation pipelines to test sensitivity to noise, parameter drift, and adverse market realizations.",
        "Compared naive backtest results against execution adjusted and stressed scenarios to expose over optimistic performance.",
        "Designed robustness diagnostics to flag strategies overly dependent on narrow regimes or unstable parameter regions."
      ],
      results: [
        "Clear identification of strategies whose performance degraded sharply under realistic stress and distributional shifts.",
        "Improved screening by eliminating fragile signals prior to further research or capital allocation."
      ],
      techNotes: [
        "Stress scenarios constructed to simulate regime changes, volatility spikes, and unfavorable return distributions.",
        "Diagnostics designed to prioritize interpretability and decision-making rather than maximizing headline metrics."
      ]
    }
  },
  {
    id: "alphaworks-platform",
    title: "AlphaWorks Agentic Backtester",
    oneLiner:
      "A research-grade quantitative IDE with an agentic MCP server for coding, testing, and iterating multi-asset trading strategies under realistic constraints.",
    stack: [
      "Python",
      "NumPy",
      "Numba",
      "Walkforward Validation",
      "Bayesian Optimization",
    ],
    metrics: [
      "Multi-asset support (equities, futures, options, crypto)",
      "Execution-aware evaluation with robustness diagnostics"
    ],
    image: { src: "/images/alpha_works.png", alt: "AlphaWorks" },
    links: [],
    featured: true,
    caseStudy: {
      problem:
        "Build a unified research environment that enables fast iteration on quantitative ideas while enforcing realistic assumptions, rigorous validation, and reproducible experimentation.",
      approach: [
        "Designed a full quantitative research IDE integrating data ingestion, feature engineering, signal design, and evaluation into a single workflow.",
        "Implemented a multi-asset backtesting engine supporting equities, futures, options, and crypto with configurable execution assumptions.",
        "Built an agentic MCP server that autonomously writes strategy code, runs experiments, evaluates results, and iterates based on feedback.",
        "Implemented walkforward validation, regime analysis, and parameter sensitivity testing to surface non-stationary failure modes.",
        "Engineered high-performance evaluation paths using Python and Numba, prioritizing deterministic behavior and research hygiene."
      ],
      results: [
        "Strategies evaluated under realistic assumptions with clear diagnostics for robustness and failure modes.",
        "A reproducible research loop enabling faster iteration without sacrificing correctness or validity."
      ],
      techNotes: [
        "Parallelized independent strategy evaluations and validation folds using multi-threaded execution to maximize throughput during large experiment sweeps.",
        "Vectorized time-series math with Numba to efficiently apply per-timestep computations across entire arrays, minimizing interpreter overhead and improving cache locality.",
        "Built-in guardrails against lookahead bias, data leakage, and invalid comparisons enforced at the framework level."
      ]
    }
  },
  {
    id: "gravity-simulator",
    title: "Physics Based Gravity Simulator",
    oneLiner:
      "A C++ simulation engine for modeling gravitational interactions with an emphasis on performance, numerical stability, and deterministic behavior.",
    stack: [
      "C++",
      "SFML",
      "Numerical Simulation",
      "Physics Modeling",
      "Performance Optimization",
      "Deterministic Systems",
    ],
    metrics: [
      "Optimized update loops for large particle systems",
      "Deterministic simulation with stable numerical behavior"
    ],
    image: { src: "/images/gravity_simulator.png", alt: "Gravity Simulator" },
    links: [{ label: "Code", href: "https://github.com/samsam324/Gravity-Simulator" }],
    featured: true,
    caseStudy: {
      problem:
        "Build a physics simulation capable of modeling gravitational interactions at scale while maintaining performance, numerical stability, and predictable behavior.",
      approach: [
        "Implemented a 2D gravity simulation engine in C++ to model particle interactions governed by Newtonian mechanics.",
        "Designed update loops and data layouts to efficiently handle large particle counts with predictable runtime behavior.",
        "Applied hardware-aware performance optimizations to reduce computational overhead in the simulation step.",
        "Implemented deterministic update logic to ensure repeatable results across runs and facilitate debugging."
      ],
      results: [
        "A stable and performant simulation capable of visualizing complex gravitational dynamics.",
        "Improved runtime performance while preserving numerical correctness and determinism."
      ],
      techNotes: [
        "Careful timestep selection and numerical handling used to reduce instability and error accumulation.",
        "Rendering and visualization integrated via SFML to support interactive inspection and debugging."
      ]
    }
  },
  {
    id: "ai-image-detector",
    title: "AI Image Detector",
    oneLiner:
      "A classifier that estimates whether an image is AI generated, built with CLIP embeddings and a calibrated supervised model.",
    stack: [
      "Python",
      "PyTorch",
      "OpenCLIP (ViT-B-32)",
      "Scikit-Learn",
      "FastAPI",
      "Streamlit",
      "Dataset Construction",
      "Model Evaluation"
    ],
    metrics: [
      "Custom labeled dataset with explicit train and val splits",
      "Calibrated probability outputs with isotonic calibration"
    ],
    image: { src: "/images/ai_image_detector.png", alt: "AI Image Detector" },
    links: [{ label: "Code", href: "https://github.com/samsam324/ai-image-detector" }, { label: "Demo", href: "https://sammy-ai-image-detector.streamlit.app/" }],
    featured: false,
    caseStudy: {
      problem:
        "Build a practical classifier that distinguishes AI generated images from real photos and provides an interpretable score via a simple web app.",
      approach: [
        "Built a labeled dataset with separate train and val splits.",
        "Extracted CLIP image embeddings (ViT-B-32) as compact feature vectors.",
        "Trained a logistic regression classifier on embeddings and calibrated probabilities with isotonic regression.",
        "Deployed the model behind a FastAPI endpoint and a Streamlit frontend for interactive testing."
      ],
      results: [
        "A working detector that returns an AI likelihood score and a binary verdict.",
        "Reproducible training pipeline which follows embedding extraction, classifier training, and finally backend artifacts."
      ],
      techNotes: [
        "Kept the model simple to focus on dataset quality, splits, and calibration.",
        "Would have loved to gather more data but my computer's storage is very limited.",
        "Handled corrupt images during embedding extraction to keep training robust."
      ]
    }
  },
  {
    id: "reinforcement-learning-agents",
    title: "Reinforcement Learning Agents",
    oneLiner:
      "Reinforcement learning agents trained in simulation for control, navigation, and decision-making under noisy and competitive environments.",
    stack: [
      "C#",
      "Unity",
      "ML-Agents",
      "Reinforcement Learning",
      "Simulation",
      "Control Systems"
    ],
    metrics: [
      "Stable policy learning under stochastic dynamics",
      "Generalization across varying environments and conditions"
    ],
    image: { src: "/images/ml_agents.png", alt: "AI Agents" },
    links: [{ label: "Code", href: "https://github.com/samsam324/Reinforcement-Learning-Agents-Unity" }],
    featured: false,
    caseStudy: {
      problem:
        "Train autonomous agents to make reliable control decisions in simulated environments with noise, competition, and partial observability.",
      approach: [
        "Designed simulated environments for autonomous vehicle control, where agents learned to navigate tracks and race against other learned policies.",
        "Trained self-driving agents using reinforcement learning to optimize speed, stability, and collision avoidance in competitive settings.",
        "Built a reaction based control agent for a time critical obstacle avoidance tasks.",
        "Designed reward functions and environment dynamics to encourage stable policies rather than brittle, overfit behaviors."
      ],
      results: [
        "Agents capable of maintaining stable control and competitive performance across varied tracks and opponent behaviors.",
        "Reliable reaction based policies demonstrating precise timing and robustness to small perturbations."
      ],
      techNotes: [
        "Focused on evaluation across varied dynamics and randomized initial conditions to assess generalization.",
        "Emphasized policy stability and control reliability over maximizing raw reward."
      ]
    }
  },
  {
    id: "brainbuddy",
    title: "BrainBuddy AI Therapy",
    oneLiner:
      "An LLM powered mental health support application focused on reliable conversation flow, state management, and real world user feedback.",
    stack: [
      "Python",
      "LLM",
      "Flutter",
      "Dart",
      "Firestore",
      "Backend Services"
    ],
    metrics: [
      "Stateful dialogue handling across conversations",
      "Pushed iterative improvements driven by real user interaction data to live app"
    ],
    image: { src: "/images/brain_buddy.png", alt: "BrainBuddy" },
    links: [],
    featured: false,
    caseStudy: {
      problem:
        "Build a deployable LLM application with reliable conversation flow, state management, and backend infrastructure suitable for real users.",
      approach: [
        "Designed an application with explicit state management to maintain coherent conversation context across user interactions.",
        "Implemented backend services for authentication, data persistence, and usage analytics using Flutter, Dart, and Firestore.",
        "Applied prompt conditioning and response controls to improve consistency and reduce obvious failure cases.",
        "Deployed the application to users and iterated on behavior based on observed interaction patterns and feedback."
      ],
      results: [
        "A deployed AI application with stable conversation handling and supporting backend services.",
        "Practical experience operating and refining an LLM based system under real usage constraints."
      ],
      techNotes: [
        "Engineering focus placed on reliability, latency, and system integration rather than model novelty.",
        "Post release updates informed by real user behavior and operational considerations."
      ]
    }
  },
];


