/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['convex'],
  allowedDevOrigins: ['192.168.0.105'],
  images: {
    domains: ['img.clerk.com', 'images.clerk.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '*.clerk.dev',
      }
    ]
  },
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DID_API_KEY: process.env.DID_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/did/:path*',
        destination: 'https://api.d-id.com/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig