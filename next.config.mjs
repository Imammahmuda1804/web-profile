/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Kita HANYA memerlukan konfigurasi untuk file 3D (.glb)
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig;