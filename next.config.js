/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // Di chuyển transpilePackages ra khỏi experimental
  transpilePackages: [
    '@happy.tech/core',
    '@happy.tech/react',
    '@walletconnect/logger',
    '@walletconnect/universal-provider',
    '@walletconnect/ethereum-provider',
    '@wagmi/connectors',
    'wagmi',
    '@rainbow-me/rainbowkit',
  ],

  webpack: (config) => {
    // Fix lỗi "import.meta" khi build
    config.module.rules.push({
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['next/babel'],
        plugins: ['@babel/plugin-syntax-import-meta'], // Cho phép `import.meta`
      },
    });

    // Fix module không được hỗ trợ
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },

  experimental: {}, // Xóa experimental.transpilePackages (vì đã di chuyển ra ngoài)

  swcMinify: false, // Tắt minification nếu lỗi Terser vẫn xảy ra
};

module.exports = nextConfig;
