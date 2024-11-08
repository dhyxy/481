import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: '/481',
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
