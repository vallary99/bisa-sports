"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SOCIALS } from "@/lib/site";
import { Icon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) menuRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="absolute -top-24 left-4 z-[100] rounded-md bg-white px-4 py-3 font-medium text-pitch focus:top-4">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] bg-white text-pitch shadow-[0_1px_0_var(--color-line-light)] ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap flex h-full items-center justify-between gap-4">
          <Link className="crest-tab" href="/" aria-label="BISA Sports home">
            <Image src="/img/bisa-crest-320.webp" alt="BISA Sports crest" width={320} height={435} sizes="88px" priority />
          </Link>
          <nav aria-label="Main" className="flex items-center gap-[clamp(1rem,2.2vw,2rem)]">
            <div className="hidden gap-[clamp(1rem,2vw,1.75rem)] min-[901px]:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="nav-link" aria-current={isCurrent(n.href) ? "page" : undefined}>{n.label}</Link>
              ))}
            </div>
            <button ref={btnRef} type="button" className="size-12 cursor-pointer rounded-sm border-[1.5px] border-line-light text-pitch min-[901px]:hidden"
              aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
              <span className="menu-bar" /><span className="menu-bar" /><span className="menu-bar" />
            </button>
          </nav>
        </div>
      </header>
      <div ref={menuRef} id="mobile-menu" className="mobile-menu fixed inset-0 z-40 flex flex-col gap-8 bg-pitch px-[clamp(1.25rem,4vw,3rem)] pb-8 pt-[calc(var(--header-h)+4.5rem)] text-cream" inert={!open}>
        <nav aria-label="Mobile">
          {[{ label: "Home", href: "/" }, ...NAV].map((n) => (
            <Link key={n.href} href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}
              className="block py-1.5 font-display text-[clamp(2rem,9vw,2.75rem)] font-extrabold uppercase leading-none no-underline aria-[current=page]:text-gold-lt">{n.label}</Link>
          ))}
        </nav>
        <div className="flex gap-2.5">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener" aria-label={`BISA Sports on ${s.name}`} className="grid size-11 place-items-center rounded-full border-[1.5px] border-line-dark">
              <Icon name={s.icon} className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
