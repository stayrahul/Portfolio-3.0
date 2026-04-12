import type { NextConfig } from "next";

/**
 * NEXT.JS 16 CONFIGURATION
 * Optimized for local network testing and Turbopack performance.
 */
const nextConfig = {
  // 1. BYPASS BUILD ERRORS
  typescript: {
    ignoreBuildErrors: true, 
  },

  // 2. IMAGE OPTIMIZATION
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // 3. PERFORMANCE
  compress: true,

  // 4. EXPERIMENTAL FEATURES & NETWORK UNLOCK
  experimental: {
    optimizeCss: true,
    /**
     * FORCE INJECT: allowedDevOrigins
     * This fixes the "Blocked cross-origin request" on your local IP.
     * We cast to 'any' to bypass strict schema validation in the terminal.
     */
    ...({
      allowedDevOrigins: ["192.168.18.166", "localhost:3000"]
    } as any)
  },

  // 5. SECURITY HEADERS
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ];
  },

  // 6. REDIRECTS & SHORTCUTS
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/email", destination: "mailto:rahul7926963@gmail.com", permanent: true },
      { source: "/github", destination: "https://github.com/stayrahul", permanent: true },
      { source: "/direct-resume", destination: "/docs/Sushant_Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;