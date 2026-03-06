import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    loader: 'custom',
    loaderFile: './cloudflare-loader.ts'
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
