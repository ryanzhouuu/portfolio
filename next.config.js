/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (gh-pages deploy).
  // In dev mode this must be absent so the dev server's CSS HMR works correctly.
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
