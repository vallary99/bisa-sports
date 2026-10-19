import type { Metadata } from "next";
import { Button, FieldLines, Lines, delay } from "@/components/ui";

export const metadata: Metadata = { title: { absolute: "Page not found | BISA Sports" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section data-hero-root className="relative flex min-h-[80svh] items-center overflow-hidden bg-pitch pt-[var(--header-h)] text-cream">
      <FieldLines />
      <div className="wrap relative">
        <h1 className="hero-title" style={{ fontSize: "clamp(2.6rem,7vw,5rem)" }}><Lines parts={["Out of", "bounds"]} /></h1>
        <p className="mt-6 text-lead" data-hero>This page doesn&apos;t exist. Head back to the main pitch.</p>
        <div className="mt-8 flex flex-wrap gap-3" data-hero style={delay(1)}>
          <Button href="/">Go to the homepage</Button>
          <Button href="/programmes" kind="ghost">See programmes</Button>
        </div>
      </div>
    </section>
  );
}
