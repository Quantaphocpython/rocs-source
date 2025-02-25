/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    transpilePackages: ['@happy.tech/core', '@happy.tech/react'],
  },
};

module.exports = nextConfig;
