import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx"],
}

export default nextConfig