import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: "/api/:path*", // Match any request starting with /api
      destination: `${process.env.API_BASE_URL}/:path*`, // Rewrite to /:path*
    },
  ],
};

export default nextConfig;
