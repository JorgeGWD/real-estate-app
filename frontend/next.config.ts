import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx"], // ignora .test.tsx
}

export default nextConfig