const names = [
  "Sushant Kushwaha",
  "stayrahul",
  "Sushant Kushwaha CCRC",
  "Sushant Kushwaha Simraungadh",
  "Sushant Kushwaha Kathmandu",
];

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Next.js Developer",
  "Generative AI Engineer",
  "UI/UX Engineer",
  "Problem Setter"
];

const skills = [
  "Next.js 15",
  "React.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "LLM Integration",
  "RAG Pipelines",
  "LangChain",
  "Docker"
];

const locations = ["Nepal", "Simraungadh", "Kathmandu", "Remote", "Worldwide", "Nepal"];

const projects = [
  "Portfolio",
  "Portfolio 2.0",
  "Portfolio 3.0",
  "Rabindra's Portfolio",
];

// Helper to generate meaningful search phrases
const generateSearchPhrases = () => {
  const phrases: string[] = [];
  
  roles.forEach(role => {
    // Intent: Hiring/Professional
    locations.forEach(loc => phrases.push(`${role} in ${loc}`));
    // Intent: Expertise
    phrases.push(`Senior ${role}`, `Expert ${role}`);
  });

  skills.forEach(skill => {
    // Intent: Technical Specificity
    phrases.push(`${skill} Developer`, `Build with ${skill}`, `${skill} Portfolio`);
  });

  return phrases;
};

// 1. Using Set to ensure ZERO duplicates
// 2. Focused on high-intent long-tail keywords
export const Keywords = Array.from(new Set([
  ...names,
  ...roles,
  ...skills,
  ...projects,
  ...locations,
  ...generateSearchPhrases(),
  "Hire Next.js Developer Nepal",
  "Best Full Stack Portfolio 2026",
  "Freelance AI Engineer",
  "React Developer for Startups",
  "Technical Content Writer Developer",
  "Student Developer Portfolio"
]));