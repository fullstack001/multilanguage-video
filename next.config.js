const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1"], // Local image domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity CDN hostname
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*", // Proxy source route
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Proxy to backend using env variable
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
