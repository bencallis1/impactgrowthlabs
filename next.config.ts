import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    
    loader: 'custom',
    loaderFile: './cloudflare-loader.ts'
    
  },
};

export default nextConfig;
