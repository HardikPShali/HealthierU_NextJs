/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
}

module.exports = nextConfig
