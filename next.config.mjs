/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
        pathname: '**',
      },
    ],
  },
  basePath: '/graphiql-app',
  assetPrefix: '/graphiql-app/',
  reactStrictMode: true,
};

export default nextConfig;
