import { selfData, skillsData } from "@/constant";

/**
 * 1. PERSON SCHEMA
 * Upgraded with safeguards to prevent the .toLowerCase() crash.
 */
export function generatePersonStructuredData() {
  // Safe skills extraction
  const skills = Array.isArray(skillsData) 
    ? skillsData.flatMap((category) =>
        category?.data?.map((skill: any) => skill?.title) || []
      )
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sushant Kushwaha",
    givenName: "Sushant",
    familyName: "Kushwaha",
    jobTitle: selfData?.jobTitle ?? "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Open Source",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Secondary Education, Nepal",
    },
    email: selfData?.email ?? "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "Nepal",
    },
    sameAs: [
      `https://github.com/${selfData?.socials_username?.github ?? ""}`,
      `https://twitter.com/${selfData?.socials_username?.twitter ?? ""}`,
      `https://instagram.com/${selfData?.socials_username?.instagram ?? ""}`,
    ].filter(link => !link.endsWith("/")), // Removes empty links
    url: "https://sushant-kushwaha.vercel.app",
    description: selfData?.bio ?? "Developer Portfolio",
    knowsAbout: [
      ...skills,
      "MedusaJS E-commerce",
      "Next.js Architecture",
      "IoT Development",
      "ESP32 Microcontrollers",
      "Hardware-Software Integration"
    ],
  };
}

/**
 * 2. WEBSITE SCHEMA
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sushant Kushwaha | Titan Terminal",
    url: "https://sushant-kushwaha.vercel.app",
    description: "Engineering portfolio featuring Next.js and IoT projects.",
    author: {
      "@type": "Person",
      name: "Sushant Kushwaha",
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
  };
}

/**
 * 3. RESUME SCHEMA
 */
export function generateResumeStructuredData() {
  const baseUrl = "https://sushantkushwaha.vercel.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Sushant Kushwaha - Resume/CV",
    description: "Professional Resume of Sushant Kushwaha - Full-Stack Developer.",
    url: `${baseUrl}/resume`,
    author: {
      "@type": "Person",
      name: "Sushant Kushwaha",
      email: selfData?.email ?? "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "Nepal",
      },
    },
    dateModified: new Date().toISOString(),
    fileFormat: "application/pdf",
    contentUrl: `${baseUrl}/docs/Sushant_Resume.pdf`,
    downloadUrl: `${baseUrl}/docs/Sushant_Resume.pdf`,
    keywords: [
      "Sushant Kushwaha Resume",
      "Software Developer Nepal",
      "Next.js Expert",
      "MedusaJS Developer",
      "ESP32 Programming",
    ],
  };
}