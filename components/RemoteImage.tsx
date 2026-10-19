"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plain <img> for licensed CDN photos. If a photo ever fails to load (removed upstream,
 * blocked network), it falls back to the labelled placeholder instead of an empty frame.
 */
export function RemoteImage({ src, srcSet, sizes, alt, pos, priority, fallback }: {
  src: string; srcSet?: string; sizes: string; alt: string; pos?: string; priority?: boolean; fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch errors that fired before hydration attached the handler.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: pos ?? "50% 50%" }}
    />
  );
}
