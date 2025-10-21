import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**', // Esto permite cualquier imagen de ese host
      },
    ],
  }


};

export default nextConfig;
