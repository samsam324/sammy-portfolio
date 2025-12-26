export type FavoriteItem = {
  id: string;
  title: string;
  kind: "Book" | "Paper" | "Talk" | "Essay";
  author: string;
  note: string;
  href: string;
};

export const favorites: FavoriteItem[] = [
  {
    id: "carver-advanced-futures",
    title: "Advanced Futures Trading Strategies",
    kind: "Book",
    author: "Robert Carver",
    note: "Deep, test driven futures strategy design with realistic constraints such as risk, sizing, and robustness.",
    href: "https://www.harriman-house.com/advancedfuturestradingstrat"
  },
  {
    id: "deep-learning-book",
    title: "Deep Learning",
    kind: "Book",
    author: "Goodfellow, Bengio, Courville",
    note: "A dense, graduate level reference for modern ML. It's mathy, rigorous, and incredibly informative.",
    href: "https://www.deeplearningbook.org/"
  },
  {
    id: "distributed_system_paper",
    title: "Time, Clocks, and the Ordering of Events in a Distributed System",
    kind: "Paper",
    author: "Leslie Lamport",
    note: "Introduces logical clocks and causal ordering to reason about event sequencing in distributed systems without relying on physical time.",
    href: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf"
  }
];