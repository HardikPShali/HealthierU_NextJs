/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   backendUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  // },
  // experimental: { appDir: true }
  images: {
    domains: ['healthieru-dev.s3.amazonaws.com']
  }
}

module.exports = nextConfig
