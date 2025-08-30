import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Thêm experimental options trực tiếp vào nextConfig
  experimental: {
    optimizePackageImports: ['next-intl', 'react-icons', 'react-country-flag', 'framer-motion'], // Thêm các thư viện cần tối ưu
  },
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
