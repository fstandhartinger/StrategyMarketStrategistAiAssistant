/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  }, 
  async rewrites() {
    return [
      {
        source: "/dataprotection",
        destination: "/dataprotection.html",
      },
      {
        source: "/termsandconditions",
        destination: "/termsandconditions.html",
      },
    ];
  },
};

module.exports = nextConfig;
