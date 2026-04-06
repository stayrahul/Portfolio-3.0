import type { Metadata } from "next";
import { resumeKeywords } from "@/constant";
import { generateResumeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume - Sushant Kushwaha",
  description:
    "View and download Sushant Kushwaha's professional resume. Student developer with expertise in React, Next.js, and full-stack development.",
  keywords: resumeKeywords,
  openGraph: {
    title: "Resume - Sushant Kushwaha",
    description:
      "View and download Sushant Kushwaha's professional resume featuring his experience and skills as a student developer.",
    url: "https://Sushant.vercel.app/resume",
    siteName: "Sushant Kushwaha",
    images: [
      {
        url: "/images/thumbnail.pdf",
        width: 1200,
        height: 630,
        alt: "Sushant Kushwaha Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Sushant Kushwaha",
    description:
      "View Sushant Kushwaha's professional resume and experience as a student developer.",
    images: ["/images/thumbnail.pdf"],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeStructuredData = generateResumeStructuredData();

  return (
    <>
      <link
        rel="preload"
        href="/docs/Sushant_Resume.pdf"
        as="fetch"
        type="application/pdf"
        crossOrigin="anonymous"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeStructuredData),
        }}
      />
      {children}
    </>
  );
}
