import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "strapi.zarifacollection.com",
      },
    ],
    domains: ["localhost"],
  },
};

export default nextConfig;
