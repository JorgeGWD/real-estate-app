import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    turbo: {
      rules: {
        // Ignorar los tests en el build de Next.js
        "*.test.{js,jsx,ts,tsx}": {
          loaders: ["ignore-loader"],
        },
      },
    },
  },
  // Solo compilar páginas reales, no tests
  pageExtensions: ["ts", "tsx", "js", "jsx"],
}

export default nextConfig