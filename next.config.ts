import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Thêm experimental options trực tiếp vào nextConfig
  experimental: {
    optimizePackageImports: ['next-intl', 'react-icons'], // Thêm các thư viện cần tối ưu
  },
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
