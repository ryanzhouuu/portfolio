// Custom domain (ryanzhou.me) serves at root — no base path needed.
// Next.js handles asset URLs for JS/CSS; we use this for local image src
// strings passed to <Image unoptimized> or plain <img>.
const BASE_PATH = '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path; // already absolute URL, leave alone
  return `${BASE_PATH}${path}`;
}
