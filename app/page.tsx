import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button, CtaBand, FactsList, Frame, JsonLd, Lines, Photo, SectionHead, SessionsBlock, WaButton, delay } from "@/components/ui";
import { SITE, SPORTS, type IconName } from "@/lib/site";
import { baseGraph, pageMeta, webPage } from "@/lib/seo";

const TITLE = "Kids Sports Academy in Mombasa | BISA Sports";
const DESC = "Football, cricket, rugby and tennis training for children aged 5 to 18 at Braeburn International School Mombasa. Group and 1-on-1 sessions. Book on WhatsApp.";
export const metadata = pageMeta({ path: "/", title: TITLE, description: DESC });

const REASONS: { icon: IconName; t: string; d: string }[] = [
  { icon: "coach", t: "International-level coaching", d: "The cricket programme is driven by Kenyan international cricketer Stephen Biko, bringing high-performance standards and real mentorship to young players." },
  { icon: "target", t: "Training built around the game", d: "Sessions are practical, intense and game focused. Players sharpen technique, decision making and conditioning in real match situations." },
  { icon: "people", t: "Character beyond sport", d: "BISA develops discipline, mental toughness, leadership and confidence, the qualities that carry children further in sport and in life." },
  { icon: "shield", t: "A secure, premium setting", d: `Training takes place at ${SITE.venue}, a safe environment where children can focus and keep improving.` },
];


const NUMBERS = [
  { c: 4, v: <span className="n">4</span>, l: "Sports" },
  { c: 2, v: <span className="n">2</span>, l: "Session types: group and 1-on-1" },
  { c: 6, v: <span className="n">6</span>, l: "Training days a week" },
  { c: 60, v: <><span className="n">60</span><span className="ml-[.08em] text-[.4em] text-gold-dk">min</span></>, l: "Group sessions" },
];

export default function Home() {
  return (
    <>
      <JsonLd graph={[...baseGraph(), webPage("/", TITLE, DESC)]} />

      {/* Hero: the photograph leads, type sits on the play */}
      <section data-hero-root className="on-dark relative flex min-h-svh items-end overflow-hidden bg-pitch text-cream" aria-labelledby="hero-title">
        <Photo id="hero" label="young footballers ready for practice" grade="grade-hero" priority sizes="100vw" className="hero-photo" />
        <div className="wrap relative z-[3] pb-[clamp(3.5rem,7vw,5.5rem)] pt-[calc(var(--header-h)+6rem)] [text-shadow:0_2px_24px_rgb(0_0_0/.28)]">
          <h1 id="hero-title" className="hero-title max-w-[11ch]">
            <Lines parts={["Built for", "game day"]} />
            <span className="sr-only">: kids sports academy in Mombasa</span>
          </h1>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="max-w-[36ch] text-lead leading-[1.5]" data-hero>Football, cricket, rugby and tennis training for young athletes aged 5 to 18 in Mombasa, coached to international standards.</p>
              <div className="mt-8 flex flex-wrap gap-3" data-hero style={delay(1)}>
                <WaButton>Book a session on WhatsApp</WaButton>
                <Button href="/programmes" kind="ghost">Explore programmes</Button>
              </div>
            </div>
            <div className="max-w-[300px] border-l-4 border-gold bg-white px-5 py-4 text-pitch" data-hero style={delay(2)}>
              <strong className="block font-display text-[1.4rem] font-extrabold uppercase leading-none">Stephen Biko</strong>
              <span className="mt-1.5 block text-[.9rem] leading-snug">Kenyan international cricketer, leading the BISA cricket programme</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statement with a photo that runs to the edge of the screen */}
      <section className="on-light relative bg-white" aria-labelledby="intro-title">
        <div className="grid lg:grid-cols-2">
          <div className="sec flex items-center px-[clamp(1.25rem,4vw,3rem)] lg:pl-[max(clamp(1.25rem,4vw,3rem),calc((100vw-1240px)/2))]">
            <div className="grid gap-7">
              <h2 id="intro-title" className="text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1]" data-reveal>
                Young players who train the right way from an early age.
              </h2>
              <div className="grid max-w-[46ch] gap-5 text-[1.05rem]" data-reveal style={delay(1)}>
                <p>BISA Sports, Biko International Sports Academy, delivers high-performance coaching in four sports, built to develop confident, disciplined and competitive athletes.</p>
                <p><Link className="textlink" href="/about">Discover BISA</Link></p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[640px]" data-reveal="mask">
            <Photo id="intro-football" label="young players in a football session" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Sports: full-width strip, photos first */}
      <section className="on-light bg-white pb-[clamp(6rem,12vw,11rem)]" aria-labelledby="sports-title">
        <div className="wrap">
          <SectionHead id="sports-title" title={<>Four sports.<br />One standard.</>}>
            Every programme follows the same approach: practical, intense, game-focused sessions.
          </SectionHead>
        </div>
        <div className="sports">
          {SPORTS.map((s, i) => (
            <Link key={s.slug} href={`/programmes/${s.slug}`} className="sport" data-reveal style={delay(i)}>
              <div className="sport-media absolute inset-0"><Photo id={`sport-${s.slug}`} label={`${s.name} session at BISA`} icon={s.icon} sizes="(max-width: 900px) 50vw, 45vw" /></div>
              <div className="absolute inset-x-0 bottom-0 z-[3] grid gap-3 p-[clamp(1.25rem,2.4vw,2.25rem)]">
                <h3 className="text-[clamp(1.9rem,2.8vw,2.6rem)] leading-[.92]"><span className="slant">{s.name}</span></h3>
                <div className="sport-more"><div>
                  <p className="max-w-[36ch] text-[.98rem]">{s.card}</p>
                  <span className="sport-cta inline-flex items-center gap-2 font-medium text-gold-lt">Explore {s.name.toLowerCase()} <Icon name="arrow" /></span>
                </div></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why BISA */}
      <section className="sec on-light relative overflow-hidden bg-cream" aria-labelledby="why-title">
        <span className="ghost-word -left-[2vw] top-[4%]" aria-hidden="true">BISA</span>
        <div className="wrap relative grid gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-5 self-start lg:sticky lg:top-[calc(var(--header-h)+2rem)]" data-reveal>
            <h2 id="why-title" className="text-h1">Why parents choose BISA</h2>
            <p className="max-w-[38ch] text-lead leading-[1.55]">Serious coaching, a safe venue and values that last beyond the final whistle.</p>
            <div><WaButton>Talk to a coach</WaButton></div>
          </div>
          <ul>
            {REASONS.map((r, i) => (
              <li key={r.t} className="grid grid-cols-[48px_1fr] gap-5 border-t border-line-light py-9 last:border-b" data-reveal style={delay(i)}>
                <Icon name={r.icon} className="mt-1 size-10 text-gold-dk" />
                <div><h3 className="mb-2.5 text-h3 leading-none">{r.t}</h3><p>{r.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values band over a full-bleed photo */}
      <section className="on-dark relative flex min-h-[80svh] items-end overflow-hidden bg-pitch text-cream" aria-labelledby="values-title">
        <div className="absolute inset-0" data-parallax="0.06" style={{ top: "-8%", bottom: "-8%" }}>
          <Photo id="pitch-football" label="football pitch from above" grade="grade-deep" sizes="100vw" />
        </div>
        <div className="wrap relative z-[3] py-[clamp(4rem,9vw,7rem)]">
          <h2 id="values-title" className="text-[clamp(2.2rem,5vw,4rem)] leading-[.92]" data-reveal>
            Discipline.<br />Mental toughness.<br /><span className="text-gold-lt">Leadership. Confidence.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lead" data-reveal style={delay(1)}>The qualities BISA builds to compete and succeed at higher levels of sport and life.</p>
        </div>
      </section>

      {/* Coach */}
      <section className="sec on-light bg-white" aria-labelledby="coach-title">
        <div className="wrap grid items-center gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-2">
          <Frame accent><Photo id="coach-biko" label="Stephen Biko coaching a young cricketer" icon="cricket" tone="cream" /></Frame>
          <div className="grid justify-items-start gap-6" data-reveal style={delay(1)}>
            <h2 id="coach-title" className="text-h1">Coached by an international</h2>
            <p className="max-w-[38ch] text-lead leading-[1.55]">BISA&apos;s cricket programme is driven by Kenyan international cricketer Stephen Biko.</p>
            <p className="max-w-[62ch]">Players get direct exposure to international experience, high-performance standards and meaningful mentorship. That elite exposure is what sets BISA apart.</p>
            <Link className="textlink" href="/coaches">Meet the coaches</Link>
          </div>
        </div>
      </section>

      {/* Scoreboard */}
      <section className="on-light bg-white" aria-label="BISA at a glance">
        <div className="wrap grid grid-cols-2 border-y border-line-light lg:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <div key={i} data-count={n.c} data-reveal style={delay(i)}
              className="grid content-start gap-2 border-line-light py-[clamp(2.5rem,5vw,4rem)] pl-[clamp(1rem,2vw,2rem)] even:border-l max-lg:[&:nth-child(n+3)]:border-t lg:[&:not(:first-child)]:border-l first:pl-0 max-lg:[&:nth-child(3)]:pl-0">
              <span className="score">{n.v}</span>
              <span className="font-display text-[1.1rem] font-bold uppercase tracking-[.14em] text-gold-dk">{n.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sessions */}
      <section className="sec on-light bg-white" aria-labelledby="sessions-title">
        <div className="wrap">
          <SectionHead id="sessions-title" title="Choose how your child trains">
            Pick a group session or focused 1-on-1 development.
          </SectionHead>
          <SessionsBlock />
        </div>
      </section>

      {/* Venue */}
      <section className="on-light relative bg-cream" aria-labelledby="venue-title">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:order-2 lg:min-h-[600px]" data-reveal="mask">
            <Photo id="venue" label="training at Braeburn International School Mombasa" icon="tennis" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="sec flex items-center px-[clamp(1.25rem,4vw,3rem)] lg:pl-[max(clamp(1.25rem,4vw,3rem),calc((100vw-1240px)/2))]">
            <div className="grid justify-items-start gap-6" data-reveal>
              <h2 id="venue-title" className="text-h1">Train at Braeburn, Mombasa</h2>
              <p className="max-w-[38ch] text-lead leading-[1.55]">A secure, premium environment that supports focused learning and steady progress.</p>
              <FactsList items={[{ icon: "pin", text: SITE.venue }, { icon: "clock", text: SITE.hoursDisplay }]} />
              <Button href={SITE.maps} kind="ghost-dark" icon="pin">Get directions</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Start your child's BISA journey" text="Tell us your child's age and sport on WhatsApp and BISA will reply with the next available session." tone="light" />

    </>
  );
}
