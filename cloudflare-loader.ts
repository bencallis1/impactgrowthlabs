import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
    return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({ src }: ImageLoaderProps) {
  // For Cloudflare Images, `src` should already be a full imagedelivery.net URL
  // or an `account_hash/image_id/variant` path. We simply return it so Next.js
  // uses the URL as-is.
  return src.startsWith("http")
    ? src
    : `https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/${normalizeSrc(src)}`;
}