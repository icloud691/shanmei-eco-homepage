const repoName = 'shanmei-eco-homepage';
const isGithubPagesBuild =
  process.env.DEPLOY_TARGET === 'gh-pages' || process.env.GITHUB_ACTIONS === 'true';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPagesBuild ? `/${repoName}` : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: isGithubPagesBuild ? `${basePath}/` : undefined,
};

export default nextConfig;
