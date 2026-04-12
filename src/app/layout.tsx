import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import { inter, mono, nasalization, quentine } from "./fonts";
import { Keywords } from "@/constant";
import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";

/**
 * 1. VIEWPORT OPTIMIZATION
 * Prevents mobile zooming on forms and sets tactical theme color
 */
export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * 2. METADATA ENGINE
 */
export const metadata: Metadata = {
  applicationName: "Sushant Kushwaha",
  title: {
    default: "Sushant Kushwaha | Portfolio",
    template: "%s | Sushant Kushwaha"
  },
  description:
    "Sushant Kushwaha is a software developer from Nepal building high-performance web applications with Next.js and AI.",
  metadataBase: new URL("https://stayrahul.me"),
  keywords: Keywords,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stayrahul.me",
    siteName: "Sushant Kushwaha",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  /**
   * 3. THE "R-CONTEXT" FIX
   * We wrap the data in a @graph object. This ensures browser extensions 
   * find the @context at the root level, stopping the .toLowerCase() crash.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      generatePersonStructuredData(),
      generateWebsiteStructuredData(),
    ],
  };

  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      // Next.js 15+ tactical fix for smooth scroll warnings
      data-scroll-behavior="smooth"
    >
      <body
        className={`
          ${inter.variable} 
          ${mono.variable} 
          ${nasalization.variable} 
          ${quentine.variable} 
          font-sans antialiased 
          bg-[#050505] text-foreground 
          selection:bg-cyan-500/20 selection:text-cyan-500
        `}
      >
        {/* 4. INJECTED STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* 5. APP CORE */}
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>

        {/* 6. GLOBAL UTILITIES */}
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              fontSize: '11px',
              fontFamily: 'inherit',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}