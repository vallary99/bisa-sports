"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Runs the site's motion after each navigation: hero entrance, scroll reveals,
 * number counters and light parallax. Everything is skipped for reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const hero = document.querySelector("[data-hero-root]");
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => hero?.classList.add("is-ready")));
    cleanups.push(() => cancelAnimationFrame(raf));

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        co.unobserve(en.target);
        const el = en.target as HTMLElement;
        const out = el.querySelector(".n");
        const target = Number(el.dataset.count);
        if (!out || reduce) return;
        let start = 0;
        const tick = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / 1400, 1);
          out.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
    cleanups.push(() => co.disconnect());

    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (par.length && !reduce) {
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        par.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const speed = Number(el.dataset.parallax) || 0.08;
          el.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px,0)`;
        });
        ticking = false;
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
