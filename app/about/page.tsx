import { Button, CtaBand, FactsList, Frame, JsonLd, PageHero, Photo, Pillars, delay } from "@/components/ui";
import { baseGraph, breadcrumbs, pageMeta, webPage } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About BISA Sports | Biko International Sports Academy, Mombasa";
const DESC = "BISA Sports is Biko International Sports Academy, a multi-sport academy in Mombasa coaching football, cricket, rugby and tennis for ages 5 to 18.";
export const metadata = pageMeta({ path: PATH, title: TITLE, description: DESC });
const CRUMBS = [{ name: "Home", href: "/" }, { name: "About" }];

export default function About() {
  return (
    <>
      <JsonLd graph={[...baseGraph(), webPage(PATH, TITLE, DESC), breadcrumbs(PATH, CRUMBS)]} />
      <PageHero title={["About", "BISA Sports"]} crumbs={CRUMBS} photo="football-match" photoLabel="young footballers in a game"
        lead="BISA is Biko International Sports Academy: a multi-sport academy in Mombasa developing confident, disciplined and competitive young athletes." />

      <section className="sec on-light bg-white" aria-labelledby="story-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <h2 id="story-title" className="text-h1" data-reveal>Our story</h2>
          <div className="grid max-w-[62ch] gap-4" data-reveal style={delay(1)}>
            <p className="text-lead leading-[1.55]">BISA delivers high-performance football, cricket, rugby and tennis training for young players, as well as adults seeking to advance their sport.</p>
            <p>Its cricket programme is driven by Kenyan international cricketer Stephen Biko, giving players direct exposure to international experience, high-performance standards and meaningful mentorship.</p>
            <p><span className="todo">Add the BISA founding story: when and why the academy started, and the meaning behind the Biko name.</span></p>
          </div>
        </div>
      </section>

      <section className="sec on-light bg-cream" aria-labelledby="mission-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <div data-reveal>
            <h2 id="mission-title" className="text-h1">Mission</h2>
            <p className="mt-6 max-w-[38ch] text-lead leading-[1.55]">Develop athletes who perform under pressure and carry discipline, leadership and confidence beyond the pitch.</p>
            <h2 className="mt-12 text-h2">Vision</h2>
            <p className="mt-4"><span className="todo">Add BISA&apos;s vision statement, as approved by the academy.</span></p>
          </div>
          <Pillars items={[
            { t: "Elite coaching", d: "International experience, high-performance standards and real mentorship." },
            { t: "Game-focused training", d: "Practical, intense sessions built around real match situations." },
            { t: "Character beyond sport", d: "Discipline, mental toughness, leadership and confidence." },
            { t: "A safe, premium setting", d: "A secure school venue that parents can trust." },
          ]} />
        </div>
      </section>

      <section className="sec on-light bg-white" aria-labelledby="approach-title">
        <div className="wrap grid items-center gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-2">
          <Frame><Photo id="football" label="a training drill" /></Frame>
          <div className="grid justify-items-start gap-6" data-reveal style={delay(1)}>
            <h2 id="approach-title" className="text-h1">How BISA trains</h2>
            <p className="max-w-[38ch] text-lead leading-[1.55]">Sessions are practical, intense and game focused.</p>
            <FactsList items={[
              { icon: "check", text: "Sharpen technique through repetition under match pressure" },
              { icon: "check", text: "Improve decision making in real match situations" },
              { icon: "check", text: "Build physical conditioning to compete at higher levels" },
              { icon: "check", text: "Grow discipline, mental toughness, leadership and confidence" },
            ]} />
            <Button href="/programmes" kind="ghost-dark">Explore programmes</Button>
          </div>
        </div>
      </section>

      <section className="sec on-light bg-cream" aria-labelledby="impact-title">
        <div className="wrap grid gap-[clamp(2rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <h2 id="impact-title" className="text-h1" data-reveal>Results and impact</h2>
          <div className="grid max-w-[62ch] gap-4" data-reveal style={delay(1)}>
            <p>Beyond physical excellence, BISA develops the qualities needed to compete and succeed at higher levels of sport and life.</p>
            <p><span className="todo">Add verified achievements: tournament results, player selections, partnerships or community work.</span></p>
          </div>
        </div>
      </section>

      <CtaBand title="See BISA in action" text="Book a session and see how your child trains at BISA." msg="Hello BISA Sports, I'd like to book a session for my child." />
    </>
  );
}
