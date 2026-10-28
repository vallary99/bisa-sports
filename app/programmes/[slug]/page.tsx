import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { CtaBand, Faq, Frame, JsonLd, PageHero, Photo, Pillars, SectionHead, SessionsBlock, delay } from "@/components/ui";
import { SITE, SPORTS, getSport, sportFaq } from "@/lib/site";
import { BIKO, baseGraph, breadcrumbs, faqSchema, pageMeta, sportService, webPage } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return SPORTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programmes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSport(slug);
  if (!s) return {};
  return pageMeta({ path: `/programmes/${s.slug}`, title: `${s.title} | BISA Sports`, description: s.meta });
}

export default async function SportPage({ params }: PageProps<"/programmes/[slug]">) {
  const { slug } = await params;
  const s = getSport(slug);
  if (!s) notFound();
  const path = `/programmes/${s.slug}`;
  const n = s.name.toLowerCase();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Programmes", href: "/programmes" }, { name: s.name }];
  const faq = sportFaq(s);
  const graph = [...baseGraph(), webPage(path, `${s.title} | BISA Sports`, s.meta), breadcrumbs(path, crumbs), faqSchema(path, faq), sportService(s)];
  if (s.slug === "cricket") graph.push(BIKO);

  return (
    <>
      <JsonLd graph={graph} />
      <PageHero title={s.h1} lead={s.intro} crumbs={crumbs} photo={s.slug === "football" ? "football-hero" : s.slug === "cricket" ? "cricket-hero" : s.slug} photoLabel={`${s.name} session at BISA`} photoIcon={s.icon} />

      <section className="sec on-light bg-white" aria-labelledby="focus-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <div data-reveal>
            <h2 id="focus-title" className="text-h1">What sessions build</h2>
            <div className="mt-6 flex flex-wrap gap-2">
                                          <span className="chip"><Icon name="clock" />Mon to Sat</span>
            </div>
          </div>
          <Pillars items={[
            { t: "Technique", d: "Skills sharpened in practical, intense drills." },
            { t: "Decision making", d: "Choices trained in real match situations." },
            { t: "Conditioning", d: "Fitness to compete at higher levels." },
            { t: "Character", d: "Discipline, mental toughness, leadership and confidence." },
          ]} />
        </div>
      </section>

      {s.slug === "cricket" && (
        <section className="sec on-light bg-white" aria-labelledby="biko-title">
          <div className="wrap grid items-center gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-2">
            <Frame accent><Photo id="coach-biko" label="Steve Biko coaching cricket" icon="cricket" tone="cream" /></Frame>
            <div className="grid justify-items-start gap-6" data-reveal style={delay(1)}>
              <h2 id="biko-title" className="text-h1">Led by Steve Biko</h2>
              <p className="max-w-[38ch] text-lead leading-[1.55]">Kenyan international cricketer Steve Biko drives BISA&apos;s cricket programme.</p>
              <p className="max-w-[62ch]">Young cricketers get direct exposure to international experience, high-performance standards and meaningful mentorship.</p>
              <Link className="textlink" href="/coaches">Meet the coaches</Link>
            </div>
          </div>
        </section>
      )}

      <section className={`sec on-light ${s.slug === "cricket" ? "bg-white" : "bg-cream"}`} aria-labelledby="price-title">
        <div className="wrap">
          <SectionHead id="price-title" title={`${s.name} sessions`}>Held at {SITE.venue}. {SITE.hoursDisplay}.</SectionHead>
          <SessionsBlock sport={n} />
        </div>
      </section>

      <section className={`sec on-light ${s.slug === "cricket" ? "bg-cream" : "bg-white"}`} aria-labelledby="faq-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <div data-reveal>
            <h2 id="faq-title" className="text-h1">{s.name} questions</h2>
            <p className="mt-6">Other sports at BISA</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SPORTS.filter((o) => o.slug !== s.slug).map((o) => <Link key={o.slug} className="chip" href={`/programmes/${o.slug}`}>{o.name}</Link>)}
            </div>
          </div>
          <div data-reveal style={delay(1)}><Faq items={faq} /></div>
        </div>
      </section>

      <CtaBand title={`Book a ${n} session`} text={`Message BISA with your child's age and BISA will confirm the next ${n} session.`}
        msg={`Hello BISA Sports, I'd like to find out about ${n} training for my child.`} />
    </>
  );
}
