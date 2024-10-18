/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/investment-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
