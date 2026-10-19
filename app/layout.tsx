import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { ShieldDefs } from "@/components/ui";
import { SITE } from "@/lib/site";

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-condensed-800.woff2", weight: "800" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700" },
  ],
  variable: "--font-barlow",
  display: "swap",
});
const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400" },
    { path: "./fonts/inter-500.woff2", weight: "500" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  icons: { icon: [{ url: "/img/favicon-32.png", sizes: "32x32", type: "image/png" }], apple: "/img/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#143228", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={`${barlow.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so reveal styles never hide content when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body>
        <ShieldDefs />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
