/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (gh-pages deploy).
  // In dev mode this must be absent so the dev server's CSS HMR works correctly.
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    // Custom domain (ryanzhou.me) serves at root — no basePath needed.
    // If you switch back to ryanzhouuu.github.io/portfolio, set basePath: '/portfolio'.
  }),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
