export type TeamMember = {
  name: string;
  role: string;
  summary: string;
  /** Path under /public. Members without a photo get a monogram card. */
  photo?: { src: string; width: number; height: number };
  monogram: string;
};

export const team: TeamMember[] = [
  {
    name: "Lorenzo Devereux",
    role: "Founder & CEO, Devereux Digitals",
    summary: "Leads the agency's direction, client relationships and digital strategy.",
    monogram: "LD",
  },
  {
    name: "Vatsal Tank",
    role: "Head Developer & Designer",
    summary: "Leads design and development, from interface design to the build and launch of each project.",
    photo: { src: "/team/vatsal-tank.jpg", width: 731, height: 674 },
    monogram: "VT",
  },
];
