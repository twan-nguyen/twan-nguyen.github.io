// All portfolio content lives here. Sections with no data are hidden.

export type Link = { label: string; href: string };

export type Project = {
  name: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export const profile = {
  name: "Twan Nguyen",
  role: "",
  bio: "",
  location: "",
  links: [{ label: "GitHub", href: "https://github.com/twan-nguyen" }] as Link[],
};

export const skills: string[] = [];

export const projects: Project[] = [];

export const experience: Experience[] = [];
