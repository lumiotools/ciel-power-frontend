import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: '/api/auth/:path*',
      destination: `${process.env.API_BASE_URL}/auth/:path*`,
    },
    {
      source: '/api/admin/:path*',
      destination: `${process.env.API_BASE_URL}/admin/:path*`,
    },
    {
      source: '/api/user/:path*',
      destination: `${process.env.API_BASE_URL}/user/:path*`,
    }
  ],
};

export default nextConfig;
