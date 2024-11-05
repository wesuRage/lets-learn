import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/practice/chats",
        permanent: true,
      },
      {
        source: "/home/",
        destination: "/home/practice/chats",
        permanent: true,
      },
      {
        source: "/home/practice",
        destination: "/home/practice/chats",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
