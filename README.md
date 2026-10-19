# BISA Sports website

Next.js 16 (App Router, TypeScript) + Tailwind CSS 4. Every page is statically prerendered.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
Deploy on Vercel (zero config) or any Node host. Point bisasports.com at it, then submit `https://bisasports.com/sitemap.xml` in Google Search Console.

## Where things live
- `lib/site.ts`: all BISA facts (contact, prices, sports copy, FAQs, photo list). Edit content here.
- `lib/seo.ts`: per-page metadata helper and JSON-LD builders.
- Type: Barlow Condensed Bold/ExtraBold for headings, Inter Regular/Medium for body text (self-hosted in `app/fonts`). Gold is for accents and buttons only, never section backgrounds. Layouts are mostly white and cream with generous spacing; pitch green is reserved for photo overlays, the values band and the footer.
- `app/globals.css`: Tailwind `@theme` brand tokens (`bg-pitch`, `text-gold-lt`, `font-display`...) plus component styles for motion, the shield frame, sport panels and buttons.
- `components/ui.tsx`: shared building blocks (Button, WaButton, Photo, PageHero, SessionsBlock, Faq, CtaBand, JsonLd...).
- `components/Header.tsx`, `Footer.tsx` (includes floating WhatsApp button), `Motion.tsx` (reveals, counters, parallax).
- Routes: `/`, `/about`, `/programmes`, `/programmes/[slug]` (football, cricket, rugby, tennis), `/coaches`, plus `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and `llms.txt`.

## Photography direction (part of the brand strategy)
Photos carry the brand, so every image must pass these tests:
- **Real play or real emotion:** mid-action, effort, celebration or a coaching moment. No posed stock smiles.
- **Who:** predominantly African children and coaches, in a Kenyan setting where possible.
- **Light and crop:** warm natural light, tight crops that fill the frame edge to edge, never boxed in cards.
- **One grade:** the `.grade` style in `globals.css` lifts contrast, mutes saturation and adds pitch-green shadows and grain, so stock and BISA's own photos look like one set.
- **Coverage BISA needs to shoot:** a session for each sport, Stephen Biko coaching, the Braeburn pitches and courts, team huddles, and portrait-format clips for Instagram and TikTok.

### Client-supplied sport photos
The four sport images (football, cricket, rugby, tennis) on the homepage sports strip and the Programmes rows are files supplied by the client, stored in `public/img/photos/sport-*.webp`. Confirm BISA has the rights to use them commercially; if they came from Pinterest or a stock site, check the original licence.

### Photos currently used (Pexels licence, free for commercial use)
Rule: people in photos are African children or teens. Where no suitable licensed photo of African young players exists (cricket, rugby, tennis), the slot shows that sport's pitch, court or equipment instead of a single non-African group.
| Slot | Photo | Credit |
| --- | --- | --- |
| Home hero | Two young African footballers in red kit, ready for practice | Madknoxx Deluxe |
| Home intro, Programmes hero | Young African boy in a training drill | Hashtag Melvin |
| Football panel and Programmes row, About hero | Children in a football game, South Africa | Thato Moiketsi |
| Cricket panel, row and page | Red cricket ball on a striped pitch | Manoj Poosam |
| Rugby panel, row and page | Rugby ball on a grass field | Thomas Ronveaux |
| Values band, Programmes football row | Aerial view of a full football pitch | Izuddin Helmi Adnan (Unsplash) |
| Programmes cricket row | Stumps on the pitch at a cricket ground | Sudhakar Chandra (Unsplash) |
| Programmes rugby row | Rugby balls on pitch markings, from above | W Rugby |
| Programmes tennis row | Aerial view of a full tennis court | Ryan Searle (Unsplash) |
| Tennis panel, row and page | Balls and racket on a court line | Pexels |

Photos load through Pexels' CDN (`lib/image-url.ts`). Replace them with BISA's own session photos as soon as they exist, especially for cricket, rugby and tennis. Stephen Biko and the Braeburn venue keep labelled placeholders.

The age range (5 to 18, plus adults) appears once on the homepage hero and in the FAQs. Keep it out of other sections.

The Programmes page pairs each sport with a real photo of its playing area: an aerial football pitch, a cricket pitch with stumps, rugby pitch markings and an aerial tennis court (Unsplash and Pexels, credited in `lib/site.ts`).

Social media appears as icons in the footer and the mobile menu. There is no Contact page for now: WhatsApp is the main channel, reached through the floating "Talk to a coach" button, the call-to-action bands and the footer.

## Before launch (client to supply or confirm)
- WhatsApp: confirm 0768 289 150 is on WhatsApp (`SITE.whatsapp`).
- Instagram and TikTok links (`SITE.instagram`, `SITE.tiktok`), then set `socialConfirmed: true`.
- Photos: BISA's own session photos (see Photography direction). Get written parental consent for every child pictured.
  Slot ids in `PHOTOS`: hero, football, tennis, team, cricket, rugby, coach-biko, venue, approach, coach-football/rugby/tennis.
- Dashed "Add ..." notes mark missing content: founding story, vision, achievements, timetables, coach profiles, Stephen Biko's record.
- Hockey is on the crest but not in the source listing, so it is not on the site. Add it to `SPORTS` if offered.
