import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React <ViewTransition> on route navigations: the home monitor morphs into a case study.
  experimental: { viewTransition: true },
};

export default nextConfig;
