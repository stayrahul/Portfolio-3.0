import "./globals.css";
import type { Metadata, Viewport } from "next"; // Added Viewport for better UI control
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import { inter, mono, nasalization, quentine } from "./fonts";
import { Keywords } from "@/constant";
import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
 
} from "@/lib/structured-data";

// 1. Separate Viewport for better UI performance on mobile
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents accidental zooming on inputs/forms
  userScalable: false,
};

export const metadata: Metadata = {
  applicationName: "Sushant Kushwaha",
  title: {
    default: "Sushant Kushwaha | Student",
    template: "%s | Sushant Kushwaha" // Allows subpages like /projects to show "Projects | Sushant Kushwaha"
  },
  description:
    "Sushant Kushwaha is a student developer from Nepal passionate about building modern web apps with Next.js and AI.",
  metadataBase: new URL("https://stayrahul.me"),
  // ... (Rest of your existing metadata stays the same)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine structured data into one array to reduce script tags
  const jsonLd = [
    generatePersonStructuredData(),
    generateWebsiteStructuredData(),
   
  ];

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`
          ${inter.variable} 
          ${mono.variable} 
          ${nasalization.variable} 
          ${quentine.variable} 
          font-sans antialiased 
          bg-background text-foreground 
          selection:bg-primary/20 selection:text-primary
        `}
      >
        {/* 2. Unified JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* 3. Main wrapper for Layout Consistency */}
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>

        {/* 4. UI Utilities */}
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}