import { SITE, SPORTS, kes } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-language summary for AI search assistants. */
export function GET() {
  const pages = ["/", "/programmes", ...SPORTS.map((s) => `/programmes/${s.slug}`), "/coaches", "/about"];
  const body = `# BISA Sports (Biko International Sports Academy)

> Multi-sport academy in Mombasa, Kenya, offering ${SPORTS.map((s) => s.name.toLowerCase()).join(", ")} training for children aged 5 to 18, and adults.

- Venue: ${SITE.venue}, Mombasa, Kenya
- Hours: ${SITE.hoursDisplay}
- Sessions: KES ${kes(SITE.priceGroup)} for a 60-minute high-performance group session; KES ${kes(SITE.priceOne)} for a 1-on-1 elite development session
- Coaches: Steve Biko (head coach, Kenyan international cricketer, leads the cricket programme), Nathan Joshi, Dennis Nyongesa (athletics and rugby coach)
- Contact: WhatsApp or phone ${SITE.phoneDisplay}, email ${SITE.email}

## Pages
${pages.map((p) => `- [${p}](${SITE.url}${p === "/" ? "" : p})`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
