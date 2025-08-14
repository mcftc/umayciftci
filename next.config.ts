import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.e.jimdo.com'],
  },
};

export default withNextIntl(nextConfig);
