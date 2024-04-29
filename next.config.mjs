/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ["picsum.photos"],
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000", // Set the base URL for NextAuth.js
    AUTH_TRUST_HOST: true, // Trust the host header from the reverse proxy
  },
};

export default nextConfig;
