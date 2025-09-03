/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow production builds on Vercel to proceed even if there are ESLint warnings/errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow builds to succeed despite TypeScript type errors (use judiciously)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

module.exports = nextConfig
