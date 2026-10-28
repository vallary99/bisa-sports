import Link from "next/link";
import { RemoteImage } from "./RemoteImage";
import { imageSrcSet, imageUrl } from "@/lib/image-url";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import { PHOTOS, SITE, kes, waLink, type IconName, type QA } from "@/lib/site";

type BtnKind = "gold" | "green" | "ghost" | "ghost-dark" | "wa";
const kindClass: Record<BtnKind, string> = { gold: "", green: "btn-green", ghost: "btn-ghost", "ghost-dark": "btn-ghost-dark", wa: "btn-wa" };

export const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function Button({ href, children, kind = "gold", icon, className = "" }: { href: string; children: ReactNode; kind?: BtnKind; icon?: IconName; className?: string }) {
  const cls = `btn ${kindClass[kind]} ${className}`;
  const inner = (<>{icon && <Icon name={icon} />}<span>{children}</span></>);
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) return <a className={cls} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>{inner}</a>;
  return <Link className={cls} href={href}>{inner}</Link>;
}

/** WhatsApp is the primary conversion: every booking button opens a chat with a pre-filled message. */
export function WaButton({ children = "Chat on WhatsApp", msg, kind = "wa", className }: { children?: ReactNode; msg?: string; kind?: BtnKind; className?: string }) {
  return <Button href={waLink(msg)} kind={kind} icon="whatsapp" className={className}>{children}</Button>;
}

function Placeholder({ label, icon, tone, className = "" }: { label: string; icon: IconName; tone?: "cream"; className?: string }) {
  return (
    <div className={`ph absolute inset-0 ${tone === "cream" ? "ph-cream" : ""} ${className}`} aria-hidden="true" data-label={label}>
      <Icon name={icon} className="ph-icon" />
    </div>
  );
}

/** Licensed photo with the BISA grade when listed in PHOTOS, otherwise a labelled placeholder. Fills its positioned parent. */
export function Photo({ id, label, icon = "football", tone, priority = false, sizes = "(max-width: 900px) 100vw, 50vw", grade = "", className = "" }: { id: string; label: string; icon?: IconName; tone?: "cream"; priority?: boolean; sizes?: string; grade?: "" | "grade-deep" | "grade-side" | "grade-hero"; className?: string }) {
  const p = PHOTOS[id];
  if (!p) return <Placeholder label={label} icon={icon} tone={tone} className={className} />;
  return (
    <div className={`grade ${grade} absolute inset-0 ${className}`}>
      <RemoteImage src={imageUrl(p.src, 1600)} srcSet={imageSrcSet(p.src)} sizes={sizes} alt={p.alt} pos={p.pos} priority={priority}
        fallback={<Placeholder label={label} icon={icon} tone={tone} />} />
    </div>
  );
}

export function FieldLines({ dark = false }: { dark?: boolean }) {
  const parts: [string, Record<string, string | number>][] = [
    ["rect", { x: 60, y: 60, width: 1320, height: 780, rx: 4 }],
    ["line", { x1: 1040, y1: 60, x2: 1040, y2: 840 }],
    ["circle", { cx: 1040, cy: 450, r: 190 }],
    ["rect", { x: 1240, y: 250, width: 140, height: 400 }],
    ["path", { d: "M1240 360a120 120 0 000 180" }],
    ["circle", { cx: 1040, cy: 450, r: 6 }],
    ["path", { d: "M60 110a50 50 0 0050-50M110 840a50 50 0 00-50-50" }],
  ];
  return (
    <svg className={`field ${dark ? "field-dark" : ""}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {parts.map(([Tag, attrs], i) => {
        const T = Tag as "rect";
        return <T key={i} className="draw" pathLength={1} style={delay(i)} {...(attrs as object)} />;
      })}
    </svg>
  );
}

export function ShieldDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="shieldClip" clipPathUnits="objectBoundingBox">
          <path d="M0,0.075 Q0.25,0.055 0.5,0 Q0.75,0.055 1,0.075 L1,0.56 Q0.99,0.86 0.5,1 Q0.01,0.86 0,0.56 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Headline split into masked lines; the last line can be gold. */
export function Lines({ parts, goldLast = true }: { parts: string[]; goldLast?: boolean }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className={`line ${goldLast && i === parts.length - 1 ? "line-gold" : ""}`}>
          <span style={delay(i)}>{p}</span>
        </span>
      ))}
    </>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="relative mb-7 text-[.9rem]">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            {i > 0 && <span className="text-gold-lt [.on-light_&]:text-gold-dk" aria-hidden="true">/</span>}
            {it.href ? <Link href={it.href} className="text-gold-lt underline underline-offset-4 [.on-light_&]:text-gold-dk">{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ title, srExtra, lead, crumbs, aside, photo, photoLabel, photoIcon, photoSide = false }: { title: string[]; srExtra?: string; lead: string; crumbs: { name: string; href?: string }[]; aside?: ReactNode; photo?: string; photoLabel?: string; photoIcon?: IconName; photoSide?: boolean }) {
  const hasPhoto = !photoSide && photo && PHOTOS[photo];
  return (
    <section data-hero-root className={`relative flex items-end overflow-hidden pb-[clamp(4rem,8vw,6.5rem)] pt-[calc(var(--header-h)+clamp(5rem,10vw,8rem))] ${hasPhoto ? "on-dark min-h-[78svh] bg-pitch text-cream" : "on-light min-h-[64svh] bg-cream text-pitch"}`} aria-labelledby="page-title">
      {hasPhoto ? <Photo id={photo} label={photoLabel ?? ""} grade="grade-side" priority sizes="100vw" className="hero-photo" /> : <FieldLines dark />}
      {!hasPhoto && photo && (
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block" data-hero-photo>
          <Photo id={photo} label={photoLabel ?? ""} icon={photoIcon} priority={photoSide} sizes="42vw" />
        </div>
      )}
      <div className="wrap relative z-[3]">
        <Crumbs items={crumbs} />
        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[1.3fr_.8fr]">
          <div>
            <h1 id="page-title" className="hero-title" style={{ fontSize: "clamp(2.6rem,6vw,4.75rem)", lineHeight: 0.9 }}>
              <Lines parts={title} />
              {srExtra && <span className="sr-only">{srExtra}</span>}
            </h1>
            <p className="mt-6 max-w-[40ch] text-lead leading-[1.55]" data-hero style={delay(1)}>{lead}</p>
          </div>
          {aside && <div data-hero style={delay(2)}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ title, id, children }: { title: ReactNode; id?: string; children?: ReactNode }) {
  return (
    <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <h2 id={id} className="max-w-[760px] text-h1" data-reveal>{title}</h2>
      {children && <p className="max-w-[46ch]" data-reveal style={delay(1)}>{children}</p>}
    </div>
  );
}

/** Session prices set like a scoreboard: two columns split by a gold rule, no cards. */
export function SessionsBlock({ sport }: { sport?: string }) {
  const tag = sport ? ` for ${sport}` : "";
  const col = "grid content-start gap-5 py-10 md:py-4";
  return (
    <div className="grid border-y border-line-light md:grid-cols-2 md:divide-x-[3px] md:divide-gold max-md:divide-y max-md:divide-line-light">
      <div className={`${col} md:pr-12`} data-reveal>
        <p className="font-display text-[1.05rem] font-bold uppercase tracking-[.16em] text-gold-dk">Group session, 60 minutes</p>
        <p className="score"><span className="mr-2 align-[.75em] text-[.3em] tracking-wider">KES</span>{kes(SITE.priceGroup)}</p>
        <p className="max-w-[40ch]">High-performance group training. Play alongside others in practical, game-focused drills.</p>
        <WaButton kind="green" className="justify-self-start" msg={`Hello BISA Sports, I'd like to book a group session${tag}.`}>Book a group session</WaButton>
      </div>
      <div className={`${col} md:pl-12`} data-reveal style={delay(1)}>
        <p className="font-display text-[1.05rem] font-bold uppercase tracking-[.16em] text-gold-dk">1-on-1 elite development</p>
        <p className="score"><span className="mr-2 align-[.75em] text-[.3em] tracking-wider">KES</span>{kes(SITE.priceOne)}</p>
        <p className="max-w-[40ch]">An individual session with a BISA coach, focused on your player&apos;s technique, decisions and conditioning.</p>
        <WaButton kind="gold" className="justify-self-start" msg={`Hello BISA Sports, I'd like to book a 1-on-1 session${tag}.`}>Book a 1-on-1 session</WaButton>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq border-t border-line-light">
      {items.map(({ q, a }) => (
        <details key={q}>
          <summary>{q}</summary>
          <div className="max-w-[64ch] pb-6"><p>{a}</p></div>
        </details>
      ))}
    </div>
  );
}

/** Closing call to action. "dark" (laurel) follows light sections; "light" (cream) breaks up runs of dark sections. Never gold. */
export function CtaBand({ title, text, msg, label = "Chat with BISA on WhatsApp", tone = "light" }: { title: string; text: string; msg?: string; label?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section className={`sec relative overflow-hidden ${dark ? "stripes on-dark bg-laurel text-cream" : "stripes-dark on-light border-t border-line-light bg-white text-pitch"}`} aria-labelledby="cta-title">
      <span aria-hidden="true" className={`pointer-events-none absolute -right-[12vw] top-1/2 aspect-square w-[46vw] max-w-[640px] -translate-y-1/2 rounded-full border-2 after:absolute after:-bottom-1/2 after:-top-1/2 after:left-1/2 after:w-0.5 ${dark ? "border-cream/10 after:bg-cream/10" : "border-pitch/10 after:bg-pitch/10"}`} />
      <div className="wrap relative grid items-center gap-x-16 gap-y-8 md:grid-cols-[1.3fr_auto]">
        <div data-reveal>
          <h2 id="cta-title" className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[.95]">{title}</h2>
          <p className="mt-4 max-w-[44ch] text-[1.1rem]">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3" data-reveal style={delay(1)}>
          <WaButton msg={msg}>{label}</WaButton>
          <Button href={`tel:${SITE.phoneTel}`} kind={dark ? "ghost" : "ghost-dark"} icon="phone">Call {SITE.phoneDisplay}</Button>
        </div>
      </div>
    </section>
  );
}

export function FactsList({ items }: { items: { icon: IconName; text: ReactNode }[] }) {
  return (
    <ul className="grid w-full gap-3.5">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[24px_1fr] items-start gap-3.5">
          <Icon name={it.icon} className="mt-0.5 size-[22px] text-gold-lt [.on-light_&]:text-gold" />
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pillars({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
      {items.map((p, i) => (
        <div key={p.t} className="grid gap-2.5 border-t-[3px] border-gold pt-5" data-reveal style={delay(i)}>
          <h3 className="text-[1.4rem]">{p.t}</h3>
          <p>{p.d}</p>
        </div>
      ))}
    </div>
  );
}

/** Media frame with a gold corner accent, used for coach and feature photos. */
export function Frame({ children, ratio = "aspect-[4/5]", accent = false, reveal = true }: { children: ReactNode; ratio?: string; accent?: boolean; reveal?: boolean }) {
  return (
    <div className="relative">
      <div className={`relative overflow-hidden rounded-card ${ratio}`} {...(reveal ? { "data-reveal": "mask" } : {})}>{children}</div>
      {accent && <span aria-hidden="true" className="pointer-events-none absolute -bottom-[18px] -left-[18px] h-[46%] w-[46%] rounded-bl-card border-b-4 border-l-4 border-gold" />}
    </div>
  );
}

export function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
