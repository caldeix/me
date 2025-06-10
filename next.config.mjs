/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Requerido para el despliegue en GitHub Pages en un subdirectorio
  basePath: '/me',
  assetPrefix: '/me/',

  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;