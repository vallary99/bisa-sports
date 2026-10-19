import type { Metadata } from "next";
import { SITE, SPORTS, kes, type QA, type Sport } from "./site";

const OG = { url: "/img/og-bisa-sports.jpg", width: 1200, height: 630, alt: "BISA Sports crest with the words Built for game day" };

/** Per-page metadata: absolute title, description, canonical, Open Graph and Twitter card. */
export function pageMeta({ path, title, description, noindex = false }: { path: string; title: string; description: string; noindex?: boolean }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE.name, locale: "en_KE", title, description, url: path, images: [OG] },
    twitter: { card: "summary_large_image", title, description, images: [OG.url] },
  };
}

const id = (frag: string) => `${SITE.url}/${frag}`;

export function baseGraph() {
  const academy: Record<string, unknown> = {
    "@type": "SportsActivityLocation",
    "@id": id("#academy"),
    name: SITE.name,
    alternateName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/img/icon-512.png`,
    image: `${SITE.url}/img/og-bisa-sports.jpg`,
    description: "Multi-sport academy in Mombasa offering football, cricket, rugby and tennis training for ages 5 to 18, and adults.",
    telephone: SITE.phoneTel,
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: SITE.country },
    containedInPlace: { "@type": "Place", name: SITE.venue },
    areaServed: { "@type": "City", name: "Mombasa" },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30", closes: "17:30",
    }],
    priceRange: `KES ${kes(SITE.priceGroup)} to KES ${kes(SITE.priceOne)} per session`,
    knowsAbout: SPORTS.map((s) => s.name),
    makesOffer: [
      { "@type": "Offer", name: "60-minute high-performance group session", price: SITE.priceGroup, priceCurrency: "KES" },
      { "@type": "Offer", name: "1-on-1 elite development session", price: SITE.priceOne, priceCurrency: "KES" },
    ],
  };
  if (SITE.socialConfirmed) academy.sameAs = [SITE.instagram, SITE.tiktok].filter(Boolean);
  const website = {
    "@type": "WebSite", "@id": id("#website"), url: `${SITE.url}/`, name: SITE.name,
    alternateName: SITE.legalName, publisher: { "@id": id("#academy") }, inLanguage: "en-KE",
  };
  return [academy, website];
}

export function webPage(path: string, title: string, description: string) {
  const url = SITE.url + path;
  return { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description,
    isPartOf: { "@id": id("#website") }, about: { "@id": id("#academy") }, inLanguage: "en-KE" };
}

export function breadcrumbs(path: string, items: { name: string; href?: string }[]) {
  return { "@type": "BreadcrumbList", "@id": `${SITE.url}${path}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE.url + (it.href ?? path) })) };
}

export function faqSchema(path: string, items: QA[]) {
  return { "@type": "FAQPage", "@id": `${SITE.url}${path}#faq`,
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

export const BIKO = {
  "@type": "Person", "@id": `${SITE.url}/coaches#stephen-biko`, name: "Stephen Biko",
  description: "Kenyan international cricketer who leads the BISA Sports cricket programme.",
  worksFor: { "@id": id("#academy") }, knowsAbout: "Cricket",
};

export function sportService(s: Sport) {
  const url = `${SITE.url}/programmes/${s.slug}`;
  return {
    "@type": "Service", "@id": `${url}#service`, name: s.title, serviceType: `${s.name} coaching`,
    provider: { "@id": id("#academy") }, areaServed: { "@type": "City", name: "Mombasa" },
    audience: { "@type": "PeopleAudience", suggestedMinAge: 5, suggestedMaxAge: 18 },
    offers: [
      { "@type": "Offer", name: "Group session (60 minutes)", price: SITE.priceGroup, priceCurrency: "KES" },
      { "@type": "Offer", name: "1-on-1 elite development session", price: SITE.priceOne, priceCurrency: "KES" },
    ],
  };
}
