import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BISA Sports", short_name: "BISA", start_url: "/", display: "standalone",
    background_color: "#143228", theme_color: "#143228",
    icons: [
      { src: "/img/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/img/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
