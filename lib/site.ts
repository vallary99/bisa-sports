/**
 * Single source of truth for BISA facts.
 * Sourced from the Kids FunScapes listing (Jan 2026) and the BISA Sports Brand Identity Guide.
 * Items marked TODO need confirmation or content from the client.
 */

export const SITE = {
  url: "https://bisasports.com",
  name: "BISA Sports",
  legalName: "Biko International Sports Academy",
  // TODO confirm this number is on WhatsApp. It is the academy's listed phone number.
  whatsapp: "254768289150",
  phoneDisplay: "0768 289 150",
  phoneTel: "+254768289150",
  email: "info@bisasports.com",
  venue: "Braeburn International School Mombasa",
  city: "Mombasa",
  country: "KE",
  hoursDisplay: "Monday to Saturday, 8:30am to 5:30pm",
  maps: "https://www.google.com/maps/search/?api=1&query=Braeburn+International+School+Mombasa",
  // TODO replace with BISA's real profile links. Set to "" to hide a platform everywhere.
  instagram: "https://www.instagram.com/REPLACE_WITH_BISA_HANDLE/",
  tiktok: "https://www.tiktok.com/@REPLACE_WITH_BISA_HANDLE",
  socialConfirmed: false, // set true once the links above are real; adds them to schema sameAs
  priceGroup: 1300,
  priceOne: 2000,
} as const;

export type IconName =
  | "football" | "cricket" | "rugby" | "tennis" | "coach" | "target" | "people" | "shield"
  | "pin" | "clock" | "age" | "phone" | "mail" | "check" | "arrow" | "arrowUp"
  | "whatsapp" | "instagram" | "tiktok";

export type Sport = {
  slug: "football" | "cricket" | "rugby" | "tennis";
  name: string;
  icon: IconName;
  card: string;
  title: string;
  h1: [string, string];
  meta: string;
  intro: string;
};

export const SPORTS: Sport[] = [
  {
    slug: "football", name: "Football", icon: "football",
    card: "Technique on the ball, sharper decisions and match fitness, trained in real game situations.",
    title: "Kids Football Training in Mombasa",
    h1: ["Kids football training", "in Mombasa"],
    meta: "Football coaching for children aged 5 to 18 at Braeburn International School Mombasa. Game-focused group and 1-on-1 sessions with BISA Sports. Book on WhatsApp.",
    intro: "BISA football sessions are practical, intense and built around the game. Young players sharpen their technique, decision making and physical conditioning in real match situations, so what they learn in training shows up on match day.",
  },
  {
    slug: "cricket", name: "Cricket", icon: "cricket",
    card: "Led by Kenyan international cricketer Stephen Biko, with international standards from the first session.",
    title: "Kids Cricket Coaching in Mombasa",
    h1: ["Kids cricket coaching", "in Mombasa"],
    meta: "Cricket coaching for ages 5 to 18 in Mombasa, led by Kenyan international cricketer Stephen Biko. Group and 1-on-1 sessions at Braeburn. Book on WhatsApp.",
    intro: "BISA's cricket programme is driven by Kenyan international cricketer Stephen Biko. Players get direct exposure to international experience, high-performance standards and real mentorship, so they learn to train the right way from an early age.",
  },
  {
    slug: "rugby", name: "Rugby", icon: "rugby",
    card: "Game-focused rugby sessions that build technique, decision making and physical conditioning.",
    title: "Kids Rugby Training in Mombasa",
    h1: ["Kids rugby training", "in Mombasa"],
    meta: "Rugby training for children and teens aged 5 to 18 at Braeburn International School Mombasa. High-performance group and 1-on-1 sessions. Book on WhatsApp.",
    intro: "BISA rugby sessions are practical, intense and game focused. Players build technique, decision making and physical conditioning in real match situations, alongside the discipline and confidence the game demands.",
  },
  {
    slug: "tennis", name: "Tennis", icon: "tennis",
    card: "Practical, intense sessions on court that sharpen technique, decisions and match fitness.",
    title: "Kids Tennis Lessons in Mombasa",
    h1: ["Kids tennis lessons", "in Mombasa"],
    meta: "Tennis coaching for children aged 5 to 18 in Mombasa. Group sessions and 1-on-1 elite development at Braeburn International School. Book on WhatsApp.",
    intro: "BISA tennis sessions are practical, intense and built around match play. Players sharpen technique, decision making and physical conditioning in real match situations, with 1-on-1 sessions for focused development.",
  },
];

export const getSport = (slug: string) => SPORTS.find((s) => s.slug === slug);

/**
 * Photography is part of the brand, not decoration. Every photo must show organised,
 * coached training or competition (drills, cones, nets, set pieces, team talks), across
 * the full 5 to 18 age range, predominantly African players and coaches, warm natural light,
 * tight crops. One CSS grade (.grade) unifies stock and BISA's own photos.
 *
 * These are licensed public photos (Unsplash and Pexels licences: free for commercial use)
 * chosen to match that direction until BISA's own sessions are photographed. They are not
 * BISA players or venues, so never caption them as BISA. To use your own: put a file in
 * /public/img/photos/ and set src to "/img/photos/name.jpg". Get written parental consent
 * for every child pictured. Slots without an entry (Stephen Biko, the Braeburn venue)
 * render a labelled placeholder. People in photos must be African children or teens, never a
 * single non-African group; where no suitable licensed photo exists (cricket, rugby, tennis)
 * the slot shows that sport's pitch, court or equipment instead.
 */
export type PhotoDef = { src: string; alt: string; credit: string; pos?: string };

export const PHOTOS: Record<string, PhotoDef> = {
  hero: {
    src: "pexels-31642262",
    alt: "Two young African footballers in red kit, ready for a training session",
    credit: "Madknoxx Deluxe, Pexels", pos: "50% 35%",
  },
  football: {
    src: "pexels-36826363",
    alt: "Young African boy in a red jersey focused on the ball during a football drill",
    credit: "Hashtag Melvin, Pexels", pos: "50% 40%",
  },
  "football-match": {
    src: "pexels-32422417",
    alt: "Children competing in a football game on a sunny pitch in South Africa",
    credit: "Thato Moiketsi, Pexels", pos: "50% 45%",
  },
  cricket: {
    src: "pexels-37043030",
    alt: "Red cricket ball resting on a striped cricket pitch",
    credit: "Manoj Poosam, Pexels", pos: "50% 50%",
  },
  rugby: {
    src: "pexels-13142768",
    alt: "Rugby ball resting on a grass field under a blue sky",
    credit: "Thomas Ronveaux, Pexels", pos: "50% 55%",
  },
  "football-hero": {
    src: "/img/photos/football-hero.webp",
    alt: "Football hitting the back of the net under stadium floodlights",
    credit: "Supplied by client (mirrored so the ball sits clear of the headline)", pos: "50% 52%",
  },
  "cricket-hero": {
    src: "/img/photos/cricket-hero.webp",
    alt: "Cricket helmet, ball and bat resting on the grass",
    credit: "Supplied by client (mirrored so the kit sits clear of the headline)", pos: "50% 55%",
  },
  "intro-football": {
    src: "/img/photos/intro-football.webp",
    alt: "Two young players contesting the ball during a coached football session on artificial turf",
    credit: "Supplied by client", pos: "50% 45%",
  },
  "sport-football": {
    src: "/img/photos/sport-football.webp",
    alt: "Football on a training pitch beside a white line, goals in the background",
    credit: "Supplied by client", pos: "50% 55%",
  },
  "sport-cricket": {
    src: "/img/photos/sport-cricket.webp",
    alt: "Red cricket ball in front of the stumps on a cricket ground",
    credit: "Supplied by client", pos: "50% 62%",
  },
  "sport-rugby": {
    src: "/img/photos/sport-rugby.webp",
    alt: "Rugby ball on the pitch beside a painted line",
    credit: "Supplied by client", pos: "45% 70%",
  },
  "sport-tennis": {
    src: "/img/photos/sport-tennis.webp",
    alt: "Two tennis rackets and a ball beside the net on a court at sunset",
    credit: "Supplied by client", pos: "50% 72%",
  },
  "pitch-football": {
    src: "photo-1517747614396-d21a78b850e8",
    alt: "Bird's-eye view of a full football pitch with floodlights",
    credit: "Izuddin Helmi Adnan, Unsplash", pos: "50% 50%",
  },
  "pitch-cricket": {
    src: "photo-1759733841123-b8e1d75ee45c",
    alt: "Cricket stumps on the pitch at a cricket ground",
    credit: "Sudhakar Chandra, Unsplash", pos: "50% 55%",
  },
  "pitch-rugby": {
    src: "pexels-5823574",
    alt: "Rugby balls on a rugby pitch with painted lines, seen from above",
    credit: "W Rugby, Pexels", pos: "50% 50%",
  },
  "pitch-tennis": {
    src: "photo-1499510318569-1a3d67dc3976",
    alt: "Aerial view of a full tennis court surrounded by trees",
    credit: "Ryan Searle, Unsplash", pos: "50% 50%",
  },
  tennis: {
    src: "pexels-12645014",
    alt: "Tennis balls and a racket on a court line",
    credit: "Pexels", pos: "50% 50%",
  },
};

export const NAV = [
  { label: "Programmes", href: "/programmes" },
  { label: "Coaches", href: "/coaches" },
  { label: "About", href: "/about" },
];

export const SOCIALS = [
  { name: "Instagram", href: SITE.instagram, icon: "instagram" as IconName, desc: "Training clips, match days and player moments" },
  { name: "TikTok", href: SITE.tiktok, icon: "tiktok" as IconName, desc: "Short drills, skills and behind the scenes" },
].filter((s) => s.href);

export const kes = (n: number) => n.toLocaleString("en-KE");

export function waLink(msg = "Hello BISA Sports, I'd like to find out about training for my child.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export type QA = { q: string; a: string };

export const BASE_FAQ: QA[] = [
  { q: "What ages does BISA Sports train?", a: "BISA trains children and teenagers from age 5 through to 18. Adults who want to take their sport further are welcome too." },
  { q: "Which sports can my child train in?", a: "Football, cricket, rugby and tennis." },
  { q: "Where does training take place?", a: `Training is held at ${SITE.venue}, a secure, premium environment for focused learning.` },
  { q: "How much does a session cost?", a: `A 60-minute high-performance group session is KES ${kes(SITE.priceGroup)}. A 1-on-1 elite development session is KES ${kes(SITE.priceOne)}.` },
  { q: "When is the academy open?", a: `${SITE.hoursDisplay}.` },
  { q: "How do I book?", a: `Message BISA on WhatsApp or call ${SITE.phoneDisplay}. You can also email ${SITE.email}.` },
];

export function sportFaq(s: Sport): QA[] {
  const n = s.name.toLowerCase();
  return [
    { q: `What age can my child start ${n} at BISA?`, a: "From age 5. BISA trains players through to 18, and adults are welcome too." },
    { q: `Where are ${n} sessions held?`, a: `At ${SITE.venue}.` },
    { q: `How much is ${n} training?`, a: `KES ${kes(SITE.priceGroup)} for a 60-minute group session, or KES ${kes(SITE.priceOne)} for a 1-on-1 elite development session.` },
    { q: "How do I book?", a: `Message BISA on WhatsApp or call ${SITE.phoneDisplay}.` },
  ];
}
