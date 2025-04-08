import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: '',
        // pathname: '/admin/**',
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        // port: '',
        // pathname: '/admin/**',
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        // port: '',
        // pathname: '/admin/**',
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        // port: '',
        // pathname: '/admin/**',
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/api/auth/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/auth/:path*`,
    },
    {
      source: "/api/admin/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/admin/:path*`,
    },
    {
      source: "/api/user/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/user/:path*`,
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
