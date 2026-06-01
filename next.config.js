/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Permanently redirect non-www (apex) to www.
      // Client wants www. as the canonical host so all pages match
      // the sitemap and indexing target.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'automationconsultingservices.org',
          },
        ],
        destination: 'https://www.automationconsultingservices.org/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;