/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: [
    '@happy.tech/core',
    '@happy.tech/react',
    '@walletconnect/logger',
    '@walletconnect/universal-provider',
    '@walletconnect/ethereum-provider',
    '@wagmi/connectors',
    'wagmi',
    '@rainbow-me/rainbowkit',
    'sonner', // Thêm sonner nếu cần
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/, // Thêm hỗ trợ .ts và .tsx
      loader: 'babel-loader',
      // Loại bỏ exclude để xử lý cả node_modules được transpile
      include: [
        /node_modules[\\/]@happy\.tech/,
        /node_modules[\\/]@walletconnect/,
        /node_modules[\\/]wagmi/,
        /node_modules[\\/]@rainbow-me/,
        /node_modules[\\/]sonner/,
      ],
      options: {
        presets: ['next/babel'],
        plugins: ['@babel/plugin-syntax-import-meta'],
      },
    });
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {},
  swcMinify: false,
};

module.exports = nextConfig;
