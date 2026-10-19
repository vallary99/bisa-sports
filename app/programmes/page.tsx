import { Button, CtaBand, Faq, Frame, JsonLd, PageHero, Photo, SectionHead, SessionsBlock, WaButton, delay } from "@/components/ui";
import { BASE_FAQ, SITE, SPORTS } from "@/lib/site";
import { baseGraph, breadcrumbs, faqSchema, pageMeta, webPage } from "@/lib/seo";

const PATH = "/programmes";
const TITLE = "Kids Sports Programmes in Mombasa | BISA Sports";
const DESC = "Football, cricket, rugby and tennis programmes for ages 5 to 18 in Mombasa. 60-minute group sessions from KES 1,300, plus 1-on-1 coaching.";
export const metadata = pageMeta({ path: PATH, title: TITLE, description: DESC });
const CRUMBS = [{ name: "Home", href: "/" }, { name: "Programmes" }];

export default function Programmes() {
  return (
    <>
      <JsonLd graph={[...baseGraph(), webPage(PATH, TITLE, DESC), breadcrumbs(PATH, CRUMBS), faqSchema(PATH, BASE_FAQ)]} />
      <PageHero title={["Sports", "programmes"]} srExtra=" for kids in Mombasa" crumbs={CRUMBS} photo="football" photoLabel="young footballer in a drill"
        lead="Football, cricket, rugby and tennis at Braeburn International School Mombasa. Group and 1-on-1 sessions, Monday to Saturday."
        aside={<div className="flex flex-wrap gap-2">{SPORTS.map((s) => <a key={s.slug} className="chip" href={`#${s.slug}`}>{s.name}</a>)}</div>} />

      <section className="sec on-light bg-white pt-[clamp(2rem,5vw,4rem)]!" aria-label="Sports">
        <div className="wrap">
          {SPORTS.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid items-center gap-[clamp(2rem,5vw,5rem)] border-t border-line-light py-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_1.1fr]">
              <figure className={`m-0 grid gap-3 ${i % 2 ? "lg:order-2" : ""}`}>
                <Frame ratio="aspect-[16/11]"><Photo id={`sport-${s.slug}`} label={`${s.name}`} icon={s.icon} sizes="(max-width: 1024px) 100vw, 50vw" /></Frame>
              </figure>
              <div className="grid justify-items-start gap-4" data-reveal style={delay(1)}>
                <h2 className="text-[clamp(2.1rem,4vw,3.2rem)]">{s.name}</h2>
                <p className="max-w-[38ch] text-lead leading-[1.55]">{s.card}</p>
                <div className="flex flex-wrap gap-2"><span className="chip">Group 60 min</span><span className="chip">1-on-1</span></div>
                <div className="flex flex-wrap gap-3">
                  <Button href={`/programmes/${s.slug}`} kind="green">{s.name} programme</Button>
                  <WaButton kind="ghost-dark" msg={`Hello BISA Sports, I'd like to find out about ${s.name.toLowerCase()} training.`}>Ask about {s.name.toLowerCase()}</WaButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec on-light bg-white" aria-labelledby="sessions-title">
        <div className="wrap">
          <SectionHead id="sessions-title" title="Sessions and pricing">The same two session types run across every sport. {SITE.hoursDisplay}.</SectionHead>
          <SessionsBlock />
          <p className="mt-6"><span className="todo">Add the weekly timetable per sport and age group, and any term or holiday camp packages.</span></p>
        </div>
      </section>

      <section className="sec on-light bg-cream" aria-labelledby="faq-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <h2 id="faq-title" className="text-h1" data-reveal>Parent questions</h2>
          <div data-reveal style={delay(1)}><Faq items={BASE_FAQ} /></div>
        </div>
      </section>

      <CtaBand title="Not sure which sport?" text="Tell BISA your child's age and interests on WhatsApp and get a recommendation." msg="Hello BISA Sports, I'd like help choosing a sport for my child." />
    </>
  );
}
