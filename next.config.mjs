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
  basePath: '',
  reactStrictMode: true,
};

export default nextConfig;
