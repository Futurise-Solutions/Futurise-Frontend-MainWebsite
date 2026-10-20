'use client';
import NextImage from 'next/image';

// Blog images live on Cloudinary, so Cloudinary resizes them (and picks AVIF/WebP via
// f_auto) and keeps every size on its CDN for good. Routing them through Vercel's
// optimizer re-encoded each width per format, expired after hours and used the plan's
// monthly image quota; first views took ~1s per image.
const CLOUDINARY = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?:([^/]*(?:f_|q_|w_|c_)[^/]*)\/)?(.*)$/;

const cloudinaryLoader = ({ src, width }) => {
  const m = src.match(CLOUDINARY);
  if (!m) return src;
  return `${m[1]}f_auto,q_auto:good,c_limit,w_${width}/${m[3]}`;
};

export default function BlogImage({ src, ...props }) {
  const isCloudinary = typeof src === 'string' && CLOUDINARY.test(src);
  return <NextImage src={src} loader={isCloudinary ? cloudinaryLoader : undefined} {...props} />;
}
