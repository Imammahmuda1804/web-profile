"use client";

// ponytail: was IndexedDB resolver, now optimized img wrapper with lazy loading & async decoding
export default function SmartImage({ src, alt = "", className = "" }) {
  if (!src) return <div className={className + " bg-gray-800 animate-pulse"} />;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
