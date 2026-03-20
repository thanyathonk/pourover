import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Smaller dev graphs: resolve lucide icons per-file instead of the full barrel.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
