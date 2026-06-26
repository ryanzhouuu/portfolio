// ryanzhouuu.github.io/portfolio — prefix needed in production for image src strings.
// Next.js handles asset URLs for JS/CSS automatically via the basePath config in next.config.js.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path; // already absolute URL, leave alone
  return `${BASE_PATH}${path}`;
}
