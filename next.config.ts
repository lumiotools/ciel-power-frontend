import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: '/api/auth/:path*',
      destination: 'http://127.0.0.1:8000/auth/:path*',
    },
    {
      source: '/api/admin/:path*',
      destination: 'http://127.0.0.1:8000/admin/:path*',
    },
    {
      source: '/api/user/:path*',
      destination: 'http://127.0.0.1:8000/user/:path*',
    }
  ],
};

export default nextConfig;
