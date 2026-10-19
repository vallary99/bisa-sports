import Link from "next/link";
import Image from "next/image";
import { SITE, SPORTS, SOCIALS, waLink } from "@/lib/site";
import { Icon } from "./Icon";

export function Footer() {
  const h = "mb-[1.1rem] mt-13 font-display text-base font-bold tracking-[.16em] text-gold-lt";
  return (
    <>
      <footer className="on-dark border-t-4 border-gold bg-pitch pb-8 text-cream">
        <div className="wrap">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="grid justify-items-start gap-5 sm:col-span-2 lg:col-span-1">
              <Link className="crest-tab shadow-none" href="/" aria-label="BISA Sports home">
                <Image src="/img/bisa-crest-320.webp" alt="BISA Sports crest" width={320} height={435} sizes="96px" style={{ width: 96 }} />
              </Link>
              <p>BISA Sports, Biko International Sports Academy. Football, cricket, rugby and tennis in Mombasa, Kenya.</p>
              <div className="flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener" aria-label={`BISA Sports on ${s.name}`} className="grid size-11 place-items-center rounded-full border-[1.5px] border-line-dark transition-colors hover:border-gold hover:bg-laurel">
                    <Icon name={s.icon} className="size-5" />
                  </a>
                ))}
              </div>
            </div>
            <div><h2 className={h}>Programmes</h2><ul className="grid gap-2.5">
              {SPORTS.map((s) => <li key={s.slug}><Link className="footer-link" href={`/programmes/${s.slug}`}>{s.name} for kids</Link></li>)}
              <li><Link className="footer-link" href="/programmes">All programmes</Link></li></ul></div>
            <div><h2 className={h}>Academy</h2><ul className="grid gap-2.5">
              <li><Link className="footer-link" href="/about">About BISA</Link></li>
              <li><Link className="footer-link" href="/coaches">Coaches</Link></li></ul></div>
            <div><h2 className={h}>Visit and contact</h2>
              <address className="not-italic"><ul className="grid gap-2.5">
                <li>{SITE.venue}, Kenya</li>
                <li>{SITE.hoursDisplay}</li>
                <li><a className="footer-link" href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a></li>
                <li><a className="footer-link" href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</a></li>
                <li><a className="footer-link" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              </ul></address></div>
          </div>
          <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-line-dark pt-6 text-[.88rem] text-cream/80">
            <span>&copy; {new Date().getFullYear()} Biko International Sports Academy</span><span>Mombasa, Kenya</span>
          </div>
        </div>
      </footer>
      <a href={waLink()} target="_blank" rel="noopener" aria-label="Talk to a coach on WhatsApp"
        className="wa-float fixed bottom-[calc(clamp(14px,2.5vw,28px)+env(safe-area-inset-bottom,0px))] right-[clamp(14px,2.5vw,28px)] z-[60] flex items-center gap-2.5 no-underline">
        <span className="wa-tip pointer-events-none whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[.92rem] font-medium text-pitch shadow-lg" aria-hidden="true">Talk to a coach</span>
        <span className="wa-btn grid size-[58px] place-items-center rounded-full bg-wa shadow-[0_10px_28px_rgb(0_0_0/.28)] transition-transform duration-300 sm:size-[62px]">
          <Icon name="whatsapp" className="size-8 text-white" />
        </span>
      </a>
    </>
  );
}
