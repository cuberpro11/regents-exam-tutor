import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
