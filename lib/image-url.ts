/**
 * Builds resized image URLs. Unsplash and Pexels photos are served straight from their own
 * CDNs (resized and converted to modern formats there), as both licences recommend.
 * Photo ids in lib/site.ts: "photo-..." = Unsplash, "pexels-<id>" = Pexels, "/img/..." = local file.
 */
export function imageUrl(src: string, width: number): string {
  if (src.startsWith("photo-")) {
    return `https://images.unsplash.com/${src}?w=${width}&q=72&auto=format&fit=crop`;
  }
  if (src.startsWith("pexels-")) {
    const id = src.slice(7);
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return src;
}

export const WIDTHS = [480, 800, 1200, 1600, 2400];

export function imageSrcSet(src: string): string | undefined {
  if (src.startsWith("/")) return undefined;
  return WIDTHS.map((w) => `${imageUrl(src, w)} ${w}w`).join(", ");
}
