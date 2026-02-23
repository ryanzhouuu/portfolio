// In production the site is served from /portfolio (gh-pages subdirectory).
// Next.js automatically prefixes asset URLs for JS/CSS via assetPrefix, but
// local image src strings passed to <Image unoptimized> or plain <img> are
// not transformed — we must prepend the base path manually.
const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path; // already absolute URL, leave alone
  return `${BASE_PATH}${path}`;
}
