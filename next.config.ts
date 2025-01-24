import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: "/api/:path*", // Match any request starting with /api
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // Rewrite to /:path*
    },
  ],
};

export default nextConfig;
