/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL || "http://localhost:3001",
  },
}

module.exports = nextConfig
