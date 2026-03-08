/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  // Redirect www to non-www and enforce HTTPS
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.plantgen.live" }],
        destination: "https://plantgen.live/:path*",
        permanent: true,
      },
    ];
  },
  // Production security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // Compresses output for smaller bundles
  compress: true,
  // Removes "X-Powered-By: Next.js" header
  poweredByHeader: false,
};

export default nextConfig;
