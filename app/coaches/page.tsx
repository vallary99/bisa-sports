import { Button, CtaBand, FactsList, Frame, JsonLd, PageHero, Photo, SectionHead, delay } from "@/components/ui";
import type { IconName } from "@/lib/site";
import { BIKO, baseGraph, breadcrumbs, pageMeta, webPage } from "@/lib/seo";

const PATH = "/coaches";
const TITLE = "Coaches | Stephen Biko and the BISA Sports Team, Mombasa";
const DESC = "Meet the BISA Sports coaches. The cricket programme is led by Kenyan international cricketer Stephen Biko. Football, rugby and tennis coaching in Mombasa.";
export const metadata = pageMeta({ path: PATH, title: TITLE, description: DESC });
const CRUMBS = [{ name: "Home", href: "/" }, { name: "Coaches" }];

export default function Coaches() {
  const team: IconName[] = ["football", "rugby", "tennis"];
  return (
    <>
      <JsonLd graph={[...baseGraph(), webPage(PATH, TITLE, DESC), breadcrumbs(PATH, CRUMBS), BIKO]} />
      <PageHero title={["Our", "coaches"]} crumbs={CRUMBS} lead="BISA coaches bring high-performance standards and real mentorship to every session." />

      <section className="sec on-light bg-white" aria-labelledby="biko-title">
        <div className="wrap grid items-center gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.85fr_1.15fr]">
          <Frame accent><Photo id="coach-biko" label="Stephen Biko portrait" icon="cricket" tone="cream" /></Frame>
          <div id="stephen-biko" className="grid justify-items-start gap-6" data-reveal style={delay(1)}>
            <p className="kicker">Cricket programme lead</p>
            <h2 id="biko-title" className="text-h1">Stephen Biko</h2>
            <FactsList items={[{ icon: "coach", text: "Kenyan international cricketer" }, { icon: "cricket", text: "Drives the BISA cricket programme" }]} />
            <p className="max-w-[62ch]">Stephen gives BISA players direct exposure to international experience, high-performance standards and meaningful mentorship, so they learn to train the right way from an early age.</p>
            <p><span className="todo">Add Stephen&apos;s playing record, coaching qualifications and an approved portrait.</span></p>
            <Button href="/programmes/cricket" kind="green">Cricket programme</Button>
          </div>
        </div>
      </section>

      <section className="sec on-light bg-white" aria-labelledby="team-title">
        <div className="wrap">
          <SectionHead id="team-title" title="The coaching team">Coaches for football, rugby and tennis.</SectionHead>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((sp, i) => (
              <article key={sp} className="grid gap-4" data-reveal style={delay(i)}>
                <Frame reveal={false}><Photo id={`coach-${sp}`} label={`${sp} coach portrait`} icon={sp} /></Frame>
                <h3 className="text-[1.35rem]">{sp} coach</h3>
                <p><span className="todo">Add name, role, credentials and a portrait.</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Train with BISA coaches" text="Book a group or 1-on-1 session on WhatsApp." msg="Hello BISA Sports, I'd like to book a session with a BISA coach." />
    </>
  );
}
