/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sitio-web-de-jerezcons.vercel.app" }],
        destination: "https://www.jerezcons.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "jerezcons.com" }],
        destination: "https://www.jerezcons.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
