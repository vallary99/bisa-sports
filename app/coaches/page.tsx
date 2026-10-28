import { Button, CtaBand, FactsList, Frame, JsonLd, PageHero, Photo, SectionHead, delay } from "@/components/ui";
import type { IconName } from "@/lib/site";
import { COACHES, baseGraph, breadcrumbs, pageMeta, webPage } from "@/lib/seo";

const PATH = "/coaches";
const TITLE = "Coaches | Steve Biko, Nathan Joshi and Dennis Nyongesa, BISA Sports Mombasa";
const DESC = "Meet the BISA Sports coaches in Mombasa: head coach and Kenyan international cricketer Steve Biko, Nathan Joshi, and athletics and rugby coach Dennis Nyongesa.";
export const metadata = pageMeta({ path: PATH, title: TITLE, description: DESC });
const CRUMBS = [{ name: "Home", href: "/" }, { name: "Coaches" }];

type Coach = { id: string; name: string; role?: string; photo: string; icon: IconName; facts: { icon: IconName; text: string }[] };

const TEAM: Coach[] = [
  {
    id: "nathan-joshi", name: "Nathan Joshi", photo: "coach-nathan", icon: "coach",
    facts: [],
  },
  {
    id: "dennis-nyongesa", name: "Dennis Nyongesa", role: "Athletics and rugby coach", photo: "coach-dennis", icon: "rugby",
    facts: [],
  },
];

export default function Coaches() {
  return (
    <>
      <JsonLd graph={[...baseGraph(), webPage(PATH, TITLE, DESC), breadcrumbs(PATH, CRUMBS), ...COACHES]} />
      <PageHero title={["Our", "coaches"]} crumbs={CRUMBS} lead="BISA coaches bring high-performance standards and real mentorship to every session." photo="train-pair" photoSide photoLabel="coach and athlete in a speed drill" />

      <section className="sec on-light bg-white" aria-labelledby="biko-title">
        <div className="wrap grid items-center gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.85fr_1.15fr]">
          <Frame accent><Photo id="coach-biko" label="Steve Biko portrait" icon="cricket" tone="cream" /></Frame>
          <div id="steve-biko" className="grid justify-items-start gap-6" data-reveal style={delay(1)}>
            <p className="kicker">Head coach</p>
            <h2 id="biko-title" className="text-h1">Steve Biko</h2>
            <FactsList items={[{ icon: "coach", text: "Kenyan international cricketer" }, { icon: "cricket", text: "Drives the BISA cricket programme" }]} />
            <p className="max-w-[62ch]">As head coach, Steve gives BISA players direct exposure to international experience, high-performance standards and meaningful mentorship, so they learn to train the right way from an early age.</p>
            <Button href="/programmes/cricket" kind="green">Cricket programme</Button>
          </div>
        </div>
      </section>

      <section className="sec on-light bg-cream" aria-labelledby="team-title">
        <div className="wrap">
          <SectionHead id="team-title" title="The coaching team" />
          <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2">
            {TEAM.map((c, i) => (
              <article key={c.id} id={c.id} className="grid content-start gap-5" data-reveal style={delay(i)} aria-labelledby={`${c.id}-name`}>
                <Frame reveal={false}><Photo id={c.photo} label={`${c.name} portrait`} icon={c.icon} tone="cream" sizes="(max-width: 768px) 100vw, 45vw" /></Frame>
                <div className="grid justify-items-start gap-3">
                  {c.role && <p className="kicker">{c.role}</p>}
                  <h3 id={`${c.id}-name`} className="text-h2 leading-none">{c.name}</h3>
                  {c.facts.length > 0 && <FactsList items={c.facts} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Train with BISA coaches" text="Book a group or 1-on-1 session on WhatsApp." msg="Hello BISA Sports, I'd like to book a session with a BISA coach." />
    </>
  );
}
