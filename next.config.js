/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (gh-pages deploy).
  // In dev mode this must be absent so the dev server's CSS HMR works correctly.
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    // Site is served from ryanzhouuu.github.io/portfolio — prefix all asset
    // paths so /_next/... becomes /portfolio/_next/...
    basePath: '/portfolio',
    assetPrefix: '/portfolio',
  }),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
