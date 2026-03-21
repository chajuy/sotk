import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Cloudinary의 모든 이미지 경로를 허용
      },
    ],
  },
};

export default nextConfig;
