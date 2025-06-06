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
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        // port: '',
        // pathname: '/admin/**',
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
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
  experimental: {
    proxyTimeout: 1000 * 60 * 2, // 2 minutes
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
