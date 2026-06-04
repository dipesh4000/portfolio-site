/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable Next.js Image Optimization for SEO and performance
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Compression for better SEO
  compress: true,
  // Enable React strict mode for development
  reactStrictMode: true,
  // PoweredBy header removal for security
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
}

export default nextConfig
