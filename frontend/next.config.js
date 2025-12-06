/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Production optimizations
  swcMinify: true,
  // Image optimization (if using BunnyCDN)
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_CDN_URL
      ? [
          {
            protocol: 'https',
            hostname: new URL(process.env.NEXT_PUBLIC_CDN_URL).hostname,
          },
        ]
      : [],
  },
}

module.exports = nextConfig

