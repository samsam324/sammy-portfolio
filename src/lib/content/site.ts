export type NavSection = {
  id: string;
  label: string;
};

export const navSections: NavSection[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "favorites", label: "Favorites" },
  { id: "contact", label: "Contact" }
];

export const site = {
  name: "Sammy Adham",
  roleLine: "Software Engineer • Systems, ML, and Quantitative Research",
  pitch:
    "I build performance software with rigorous evaluation and realistic assumptions that holds up under real world constraints.",
  locationLine: "Irvine, CA • UCLA Mathematics of Computation (BS) • Class of 2028",
  email: "sammyadham@gmail.com",
  links: {
    github: "https://github.com/samsam324",
    linkedin: "https://www.linkedin.com/in/sammy-adham-8b9284354/",
  },
} as const;


