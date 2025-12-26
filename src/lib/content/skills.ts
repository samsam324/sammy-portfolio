export type SkillBucket = {
  id: "languages" | "tech_platforms" | "math";
  title: string;
  items: string[];
};

export const skillBuckets: SkillBucket[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      "Python",
      "C++",
      "C",
      "C#",
      "Java",
      "TypeScript",
      "JavaScript",
      "MATLAB",
      "HTML",
      "CSS",
      "Dart",
    ]
  },
  {
    id: "tech_platforms",
    title: "Technology & platforms",
    items: [
      "NumPy",
      "Pandas",
      "Numba",
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "OpenCV",
      "Flutter",
      "Firestore",
      "Unity",
      "ML-Agents",
      "Git"
    ]
  },
  {
    id: "math",
    title: "Mathematics",
    items: [
      "Probability",
      "Statistics",
      "Linear Algebra",
      "Number Theory",
      "Differential Equations",
      "Discrete Mathematics",
      "Optimization",
      "Calculus"
    ]
  }
];


