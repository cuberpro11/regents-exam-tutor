import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid picking a parent dir that has another lockfile (e.g. ~/package-lock.json).
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/courses.html", destination: "/courses", permanent: true },
      { source: "/algebra1.html", destination: "/algebra1", permanent: true },
      { source: "/geometry.html", destination: "/geometry", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
    ];
  },
};

export default nextConfig;
