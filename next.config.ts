import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Specify the turbopack root to silence the inferred-workspace warning.
  // Set to the project folder (relative path) so Next.js uses this as the workspace root.
  turbopack: {
    root: "./",
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

export default nextConfig
