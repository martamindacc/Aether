import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogShell } from "@/components/blog-shell";
import { BlogCta } from "@/components/blog-cta";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { getAllSlugs, getPostBySlug, getTranslationsForPost, htmlLangFor } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const localeMap: Record<string, string> = {
    no: "nb_NO",
    pl: "pl_PL",
    en: "en_US",
  };

  const translations = getTranslationsForPost(post);
  const languages =
    translations.length > 1
      ? Object.fromEntries(translations.map((t) => [t.lang, `/blog/${t.slug}`]))
      : undefined;

  return pageMetadata({
    title: post.seoTitle || `${post.title} | Aether Practice`,
    description: post.seoDescription || post.description,
    path: `/blog/${post.slug}`,
    locale: localeMap[post.lang] || "en_US",
    languages,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    tags: post.tags,
  });
}

const backToBlogLabel: Record<"en" | "no" | "pl", string> = {
  en: "← Back to Blog",
  no: "← Tilbake til bloggen",
  pl: "← Powrót do bloga",
};

const englishTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "couples-therapy-founders-executives": [
    ["The Founder and Executive Relationship Crisis: What the Research Shows", "The Founder and Executive Relationship Crisis: What the Research Shows"],
    ["Why This Matters: The Research on Outcomes", "Why This Matters: The Research on Outcomes"],
    ["The Real Barriers: Why Founders and Executives Resist Couples Therapy", "The Real Barriers: Why Founders and Executives Resist Couples Therapy"],
    ["How Couples Therapy Actually Works for Founders and Executives", "How Couples Therapy Actually Works for Founders and Executives"],
    ["Finding Time: How Founders Actually Prioritize Couples Therapy", "Finding Time: How Founders Actually Prioritize Couples Therapy"],
    ["What to Look for in a Couples Therapist for Founders and Executives", "What to Look for in a Couples Therapist for Founders and Executives"],
    ["The Founder/Executive Decision Tree", "The Founder/Executive Decision Tree"],
    ["FAQ: Couples Therapy for Founders and Executives", "FAQ: Couples Therapy for Founders and Executives"],
    ["The Bottom Line", "The Bottom Line"],
    ["Ready to Invest in Your Relationship?", "Ready to Invest in Your Relationship?"],
    ["References & Further Reading", "References & Further Reading"],
  ],
  "8-signs-need-couples-therapy": [
    ["You have the same conflicts over and over again", "1. You have the same conflicts over and over again"],
    ["You can't talk about difficult things without escalation", "2. You can't talk about difficult things without escalation"],
    ["You feel more like adversaries than teammates", "3. You feel more like adversaries than teammates"],
    ["One or both of you has started withdrawing emotionally", "4. One or both of you has started withdrawing emotionally"],
    ["Intimacy, sex, or closeness has become a conflict zone", "5. Intimacy, sex, or closeness has become a conflict zone"],
    ["Trust has been broken", "6. Trust has been broken"],
    ["You function on the surface, but struggle together", "7. You function on the surface, but struggle together"],
    ["You're already wondering if you should separate", "8. You're already wondering if you should separate"],
    ["Do you need couples therapy?", "Do you need couples therapy?"],
    ["When should you go to couples therapy?", "When should you go to couples therapy?"],
    ["What if only one of you wants couples therapy?", "What if only one of you wants couples therapy?"],
    ["When couples therapy isn't the right first step", "When couples therapy isn't the right first step"],
    ["Common questions about couples therapy", "Common questions about couples therapy"],
  ],
  "couples-communication-problems": [
    ["Signs of Poor Communication", "Signs of Poor Communication in a Relationship"],
    ["Why Do Communication Problems Develop?", "Why Do Communication Problems Develop?"],
    ["Gottman's Four Horsemen", "Gottman's Four Horsemen: The Patterns That Damage Relationships"],
    ["69% of Conflicts Are Unsolvable", "69 Percent of Conflicts Are Unsolvable — And That's Okay"],
    ["The Pursuer-Withdrawer Pattern", "The Pursuer-Withdrawer Pattern: When One Pushes and the Other Pulls Back"],
    ["What Separates Couples Who Stay Together?", "What Separates Couples Who Stay Together From Those Who Don't?"],
    ["What to Say Instead", "What to Say Instead: Concrete Examples"],
    ["How to Communicate Better", "How to Communicate Better in Your Relationship"],
    ["When to Get Help", "When Should You Get Help for Communication Problems?"],
    ["FAQ: Communication Problems", "FAQ: Communication Problems in Relationships"],
  ],
  "online-couples-therapy": [
    ["What Is Online Couples Therapy?", "What Is Online Couples Therapy?"],
    ["Is It as Effective as In-Person?", "Is Online Couples Therapy as Effective as In-Person?"],
    ["Who Is It Right For?", "Who Is Online Couples Therapy Right For?"],
    ["When Might It Not Be the Right Fit?", "When Might It Not Be the Right Fit?"],
    ["Do We Have to Be in the Same Room?", "Do We Have to Be in the Same Room?"],
    ["What Do We Need Technically?", "What Do We Need Technically?"],
    ["What a Session Actually Looks Like", "What a Session Actually Looks Like"],
    ["The Real Advantages", "The Real Advantages of Online Couples Therapy"],
    ["What Does It Cost?", "What Does Online Couples Therapy Cost?"],
    ["Online Couples Therapy at Aether Practice", "Online Couples Therapy at Aether Practice"],
    ["FAQ: Online Couples Therapy", "FAQ: Online Couples Therapy"],
  ],
};

const englishLedeBySlug: Record<string, string> = {
  "couples-therapy-founders-executives":
    "Couples therapy for founders, CEOs, executives, and entrepreneurs helps address relationship problems caused by startup stress, long hours, leadership pressure, financial uncertainty, and work-life imbalance. This guide explains how executive relationship stress affects a partnership, when therapy can help, and how high-achieving couples can protect their connection while building a demanding career.",
  "8-signs-need-couples-therapy":
    "Are you considering couples therapy because you have repeated conflicts, communication problems, or feel increasingly distant from each other? You do not have to wait until your relationship is on the verge of breaking down before seeking professional help. Here are 8 signs that you may need couples therapy, what they can mean for your relationship, and when it may be the right time to seek help.",
};

const faqBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "couples-therapy-founders-executives": [
    ["My partner brought up therapy, but I think we're fine. Should I go?", "When one partner brings up therapy and the other doesn't see the need, that is a signal that therapy could help. A neutral third party can help both partners hear the concern clearly and understand the patterns affecting the relationship."],
    ["What if I'm worried the therapist will blame me?", "A good couples therapist will not blame one person. They will help both partners see the patterns they are creating together. If a therapist is blaming you, they may not be the right fit."],
    ["Can therapy help if I'm determined to stay focused on the company?", "Therapy can help you stay focused on the company while maintaining a partnership, but it requires giving the relationship intentional attention."],
    ["What if my partner is the one in high-intensity work?", "Therapy can help the partner of a founder or executive express the impact of work intensity, negotiate what partnership means during demanding periods, and prevent resentment from accumulating."],
    ["How do I know if we can actually repair this?", "If both partners genuinely want to repair the relationship and are willing to invest, repair is often possible. Therapy can also provide clarity when one partner is unsure about continuing."],
    ["What if I'm afraid therapy will reveal that we're fundamentally incompatible?", "Couples therapy may reveal differences or patterns that need attention, but it can also show that relational distance—not fundamental incompatibility—is creating the current strain."],
    ["Is couples therapy confidential if I have a public profile as a founder or executive?", "Standard confidentiality protections apply regardless of professional visibility. A therapist experienced with high-profile clients can also account for discretion, flexible scheduling, and secure virtual sessions."],
  ],
  "parterapi-grundere-ledere": [
    ["Partneren min tok opp terapi, men jeg synes vi har det fint. Bør jeg bli med?", "Når én partner tar opp terapi og den andre ikke ser behovet, kan det være et signal om at terapi kan hjelpe. En nøytral tredjepart kan hjelpe dere å høre bekymringen tydelig og forstå mønstrene som påvirker forholdet."],
    ["Hva om jeg er redd for at terapeuten skal skylde på meg?", "En god parterapeut skylder ikke på én person. Terapeuten hjelper begge med å se mønstrene dere skaper sammen. Hvis terapeuten legger skylden på deg, er det kanskje ikke riktig terapeut."],
    ["Kan terapi hjelpe hvis jeg er bestemt på å holde fokus på selskapet?", "Terapi kan hjelpe deg med å holde fokus på selskapet og samtidig ta vare på parforholdet, men det krever at forholdet får bevisst oppmerksomhet."],
    ["Hva om det er partneren min som jobber med høy intensitet?", "Terapi kan hjelpe partneren til en gründer eller leder med å uttrykke hvordan arbeidspresset påvirker dem, forhandle om partnerskap i intense perioder og hindre at bitterhet bygger seg opp."],
    ["Hvordan vet vi om vi faktisk kan reparere forholdet?", "Hvis begge virkelig ønsker å reparere forholdet og er villige til å investere, er reparasjon ofte mulig. Terapi kan også gi klarhet når én partner er usikker på om forholdet skal fortsette."],
    ["Hva om jeg er redd for at terapi vil vise at vi egentlig ikke passer sammen?", "Parterapi kan avdekke forskjeller og mønstre som trenger oppmerksomhet, men kan også vise at det er avstand i relasjonen – ikke grunnleggende inkompatibilitet – som skaper belastningen."],
    ["Er parterapi konfidensielt hvis jeg har en offentlig rolle som gründer eller leder?", "Vanlige regler for konfidensialitet gjelder uansett hvor synlig du er profesjonelt. En terapeut med erfaring med offentlige personer kan også ta hensyn til diskresjon, fleksible tider og sikre digitale samtaler."],
  ],
  "terapia-par-dla-founderow-dyrektorow": [
    ["Partner wspomniał o terapii, ale uważam, że wszystko jest w porządku. Czy powinienem iść?", "Kiedy jedna osoba proponuje terapię, a druga nie widzi takiej potrzeby, może to być sygnał, że terapia pomoże. Neutralna osoba trzecia może pomóc wam jasno usłyszeć obawy i zrozumieć wzorce wpływające na związek."],
    ["A jeśli boję się, że terapeuta będzie mnie obwiniał?", "Dobry terapeuta par nie obwinia jednej osoby. Pomaga obojgu partnerom zobaczyć wzorce, które tworzą razem. Jeśli terapeuta obwinia ciebie, prawdopodobnie nie jest właściwą osobą."],
    ["Czy terapia może pomóc, jeśli jestem zdecydowany nadal skupiać się na firmie?", "Terapia może pomóc skupić się na firmie i jednocześnie dbać o związek, ale wymaga poświęcenia relacji świadomej uwagi."],
    ["A jeśli to mój partner pracuje z wysoką intensywnością?", "Terapia może pomóc partnerowi foundera lub lidera wyrazić wpływ intensywnej pracy, ustalić znaczenie partnerstwa w wymagających okresach i zapobiegać narastaniu urazy."],
    ["Skąd będziemy wiedzieć, czy naprawdę możemy to naprawić?", "Jeśli oboje naprawdę chcecie naprawić związek i jesteście gotowi się zaangażować, naprawa jest często możliwa. Terapia może też przynieść jasność, gdy jedna osoba nie wie, czy chce kontynuować relację."],
    ["A jeśli boję się, że terapia pokaże, iż fundamentalnie do siebie nie pasujemy?", "Terapia par może ujawnić różnice lub wzorce wymagające uwagi, ale może też pokazać, że obecne trudności wynikają z dystansu w relacji, a nie z fundamentalnej niezgodności."],
    ["Czy terapia par jest poufna, jeśli mam publiczny profil foundera lub lidera?", "Standardowe zasady poufności obowiązują niezależnie od widoczności zawodowej. Terapeuta doświadczony w pracy z osobami publicznymi może również uwzględnić dyskrecję, elastyczny grafik i bezpieczne sesje online."],
  ],
  "parterapi-i-oslo": [
    ["Vi argumenterer ikke så mye. Trenger vi parterapi?", "Ja, muligens. Fraværet av argumenter betyr ikke nødvendigvis at forholdet er sunt. Noen par har svært lite konflikt, men mye følelsesmessig avstand eller nummenhet. Hvis du merker at noe har endret seg eller at intimitet mangler, er det verdt å utforske med en terapeut."],
    ["Hva hvis bare jeg vil til terapi?", "Det er mulig å starte med å søke hjelp selv om bare én partner er motivert. En terapeut kan hjelpe med å forstå denne asymmetrien og utforske hvordan begge kan engasjere seg."],
    ["Kan parterapi hjelpe etter utroskap?", "Ja. Parterapi etter utroskap kan gi paret et strukturert rom for å forstå hva som har skjedd, håndtere reaksjoner og arbeide med tillit og kommunikasjon. For noen par handler prosessen om å reparere forholdet; for andre handler den om å finne ut hva som skal til for å gå videre sammen eller hver for seg."],
    ["Kan parterapi hjelpe hvis jeg vurderer skilsmisse?", "Ja. Parterapi kan hjelpe dere med å utforske hva dere ønsker, forstå mønstrene i forholdet og få et tydeligere grunnlag for å ta stilling til veien videre. For noen par handler det om å forsøke å gjenoppbygge forholdet; for andre kan prosessen bidra til å avklare om de ønsker å gå videre sammen eller hver for seg."],
    ["Når er parterapi ikke riktig hjelp?", "Parterapi forutsetter at begge partnerne kan delta frivillig og på en trygg måte. Ved vold, trusler eller overgrep i forholdet er parterapi ikke riktig første steg. Da bør sikkerhet og individuell hjelp komme først."],
  ],
};

const polishLedeBySlug: Record<string, string> = {
  "terapia-par-dla-founderow-dyrektorow":
    "Terapia par dla founderów, CEO i osób na stanowiskach kierowniczych może pomóc, gdy stres związany ze startupem, długie godziny pracy, presja przywództwa i brak równowagi między pracą a życiem prywatnym tworzą dystans w związku. Ten przewodnik wyjaśnia, jak stres zawodowy wpływa na relację, kiedy terapia par może pomóc i jak pary wysoko funkcjonujące mogą chronić bliskość podczas budowania wymagającej kariery.",
  "8-znakow-potrzeba-terapii-par":
    "Zastanawiacie się nad terapią par, ponieważ wciąż wracacie do tych samych konfliktów, macie problemy z komunikacją albo czujecie, że coraz bardziej się od siebie oddalacie? Nie musicie czekać, aż wasz związek znajdzie się na skraju rozpadu, żeby poszukać profesjonalnej pomocy. Oto 8 oznak, że możecie potrzebować terapii par, co mogą oznaczać dla waszej relacji i kiedy warto poszukać pomocy.",
};

const norwegianTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "parterapi-grundere-ledere": [
    ["Krise i parforholdet hos gründere og ledere: Hva forskningen viser", "Krise i parforholdet hos gründere og ledere: Hva forskningen viser"],
    ["Hvorfor dette betyr noe: Forskning på konsekvensene", "Hvorfor dette betyr noe: Forskning på konsekvensene"],
    ["De virkelige hindrene: Hvorfor gründere og ledere motsetter seg parterapi", "De virkelige hindrene: Hvorfor gründere og ledere motsetter seg parterapi"],
    ["Slik fungerer parterapi for gründere og ledere", "Slik fungerer parterapi for gründere og ledere"],
    ["Å finne tid: Slik prioriterer gründere parterapi", "Å finne tid: Slik prioriterer gründere parterapi"],
    ["Hva du bør se etter hos en parterapeut for gründere og ledere", "Hva du bør se etter hos en parterapeut for gründere og ledere"],
    ["Gründerens og lederens beslutningstre", "Gründerens og lederens beslutningstre"],
    ["FAQ: Parterapi for gründere og ledere", "FAQ: Parterapi for gründere og ledere"],
    ["Hovedpoenget", "Hovedpoenget"],
    ["Klar for å investere i forholdet?", "Klar for å investere i forholdet?"],
    ["Referanser og videre lesning", "Referanser og videre lesning"],
  ],
  "parterapi-i-oslo": [
    ["Hva Er Parterapi Egentlig?", "Hva Er Parterapi Egentlig?"],
    ["Hvorfor Parterapi Er Annerledes Enn Individualterapi", "Hvorfor Parterapi Er Annerledes Enn Individualterapi"],
    ["Tegn på At Dere Trenger Parterapi", "Tegn på At Dere Trenger Parterapi"],
    ["Når Skal Du Søke Parterapi?", "Når Skal Du Søke Parterapi?"],
    ["Typer Parterapi", "Typer Parterapi"],
    ["Hvordan Velge En Parterapeut i Oslo", "Hvordan Velge En Parterapeut i Oslo"],
    ["Hva Forventer Du Fra Parterapi?", "Hva Forventer Du Fra Parterapi?"],
    ["Parterapi Oslo: Hva Koster Det?", "Parterapi Oslo: Hva Koster Det?"],
    ["Privat Parterapi Oslo", "Privat Parterapi Oslo"],
    ["Tegn På At En Terapeut IKKE Er Riktig", "Tegn På At En Terapeut IKKE Er Riktig"],
    ["FAQ: Parterapi i Oslo", "FAQ: Parterapi i Oslo"],
    ["Om Aether Practice", "Om Aether Practice"],
    ["Ta Neste Steg", "Ta Neste Steg"],
    ["Forskning og Videre Lesning", "Forskning og Videre Lesning"],
  ],
  "parterapi-i-oslo-tegn": [
    ["Dere har de samme konfliktene om og om igjen", "1. Dere har de samme konfliktene om og om igjen"],
    ["Dere klarer ikke å snakke om vanskelige ting uten at det eskalerer", "2. Dere klarer ikke å snakke om vanskelige ting uten at det eskalerer"],
    ["Dere føler dere mer som motstandere enn som et team", "3. Dere føler dere mer som motstandere enn som et team"],
    ["Én eller begge har begynt å trekke seg følelsesmessig unna", "4. Én eller begge har begynt å trekke seg følelsesmessig unna"],
    ["Nærhet, sex eller intimitet har blitt et konfliktområde", "5. Nærhet, sex eller intimitet har blitt et konfliktområde"],
    ["Tilliten er svekket", "6. Tilliten er svekket"],
    ["Dere fungerer på utsiden, men har det dårlig sammen", "7. Dere fungerer på utsiden, men har det dårlig sammen"],
    ["Dere vurderer allerede om dere skal gå fra hverandre", "8. Dere vurderer allerede om dere skal gå fra hverandre"],
    ["Trenger vi parterapi?", "Trenger vi parterapi?"],
    ["Når bør man gå i parterapi?", "Når bør man gå i parterapi?"],
    ["Hva hvis bare én av dere ønsker parterapi?", "Hva hvis bare én av dere ønsker parterapi?"],
    ["Når parterapi ikke er riktig første steg", "Når parterapi ikke er riktig første steg"],
    ["Vanlige spørsmål om parterapi", "Vanlige spørsmål om parterapi"],
  ],
  "nar-friluftsliv-blir-viktigere-enn-forholdet": [
    ["Når friluftsliv blir en erstatning for intimitet", "Når friluftsliv blir en erstatning for intimitet"],
    ["Tegn på at aktivitet har tatt plassen til intimitet", "Tegn på at aktivitet har tatt plassen til intimitet"],
    ["Hvorfor dette kan være spesielt relevant i Norge", "Hvorfor dette kan være spesielt relevant i Norge"],
    ["Hva forskningen sier om friluftsliv, fritid og parforhold", "Hva forskningen sier om friluftsliv, fritid og parforhold"],
    ["Slik kan dere finne tilbake til intimiteten hjemme", "Slik kan dere finne tilbake til intimiteten hjemme"],
    ["Hva hvis partneren din ikke ser problemet?", "Hva hvis partneren din ikke ser problemet?"],
    ["Når kan parterapi være nyttig?", "Når kan parterapi være nyttig?"],
    ["FAQ: Friluftsliv og intimitet i parforhold", "FAQ: Friluftsliv og intimitet i parforhold"],
    ["Friluftslivet trenger ikke forsvinne. Men forholdet trenger mer enn turen.", "Friluftslivet trenger ikke forsvinne. Men forholdet trenger mer enn turen."],
    ["Klare for å finne tilbake til nærheten?", "Klare for å finne tilbake til nærheten?"],
  ],
  "parterapi-pris-oslo": [
    ["Hva Koster Parterapi i Oslo?", "Hva Koster Parterapi i Oslo?"],
    ["Prissammenligning: Tilbydere i Oslo", "Prissammenligning: Tilbydere i Oslo"],
    ["Hva Påvirker Prisen på Parterapi?", "Hva Påvirker Prisen på Parterapi?"],
    ["Gratis Parterapi i Oslo: Familievernet", "Gratis Parterapi i Oslo: Familievernet"],
    ["Privat vs. Offentlig Parterapi", "Privat vs. Offentlig Parterapi — Hva Er Forskjellen?"],
    ["Online Parterapi Oslo", "Online Parterapi Oslo: Like Effektivt, Mer Fleksibelt"],
    ["Hva Koster Parterapi hos Aether Practice?", "Hva Koster Parterapi hos Aether Practice?"],
    ["Dekker Forsikring Parterapi i Oslo?", "Dekker Forsikring Parterapi i Oslo?"],
    ["Hvor Mange Sesjoner Trenger Dere?", "Hvor Mange Sesjoner Trenger Dere?"],
    ["Er Parterapi Verdt Pengene?", "Er Parterapi Verdt Pengene?"],
    ["FAQ: Pris og Parterapi Oslo", "FAQ: Pris og Parterapi Oslo"],
  ],
  "parterapi-pa-nett": [
    ["Hva Er Parterapi på Nett?", "Hva Er Parterapi på Nett?"],
    ["Fungerer Parterapi på Nett Like Godt?", "Fungerer Parterapi på Nett Like Godt Som Fysisk Parterapi?"],
    ["Hvem Passer Parterapi på Nett For?", "Hvem Passer Parterapi på Nett For?"],
    ["Når Passer Det Ikke?", "Når Passer Det Ikke?"],
    ["Må Vi Sitte i Samme Rom?", "Må Vi Sitte i Samme Rom?"],
    ["Hva Trenger Vi Teknisk?", "Hva Trenger Vi for Å Ha Parterapi på Nett?"],
    ["Slik Foregår En Online Parterapitime", "Slik Foregår En Online Parterapitime i Praksis"],
    ["Fordeler med Parterapi på Nett", "Fordeler med Parterapi på Nett"],
    ["Hva Koster Parterapi på Nett?", "Hva Koster Parterapi på Nett?"],
    ["Parterapi på Nett i Hele Norge", "Parterapi på Nett i Hele Norge"],
    ["Online Parterapi hos Aether Practice", "Online Parterapi hos Aether Practice"],
    ["FAQ: Parterapi på Nett", "FAQ: Parterapi på Nett"],
  ],
  "kommunikasjonsproblemer-i-parforhold": [
    ["Tegn på Dårlig Kommunikasjon", "Tegn på Dårlig Kommunikasjon i Parforhold"],
    ["Hvorfor Oppstår Kommunikasjonsproblemer?", "Hvorfor Oppstår Kommunikasjonsproblemer i Parforhold?"],
    ["Gottmans Fire Ryttere", "Gottmans Fire Ryttere: Mønstrene Som Skader Parforholdet"],
    ["69 Prosent av Konflikter Er Uløselige", "69 Prosent av Konflikter Er Uløselige — Og Det Er OK"],
    ["Forfølger–Tilbaketrekker-mønsteret", "Forfølger–Tilbaketrekker: Når Én Presser og Den Andre Trekker Seg Unna"],
    ["Hva Skiller Par Som Holder?", "Hva Skiller Par Som Holder Fra Par Som Skiller Seg?"],
    ["Konkrete Eksempler: Hva Kan Dere Si?", "Hva Kan Dere Si I Stedet? Konkrete Eksempler"],
    ["Hvordan Få Bedre Kommunikasjon?", "Hvordan Få Bedre Kommunikasjon i Parforholdet?"],
    ["Når Bør Dere Søke Hjelp?", "Når Bør Dere Søke Hjelp for Kommunikasjonsproblemer?"],
    ["FAQ: Kommunikasjonsproblemer", "FAQ: Kommunikasjonsproblemer i Parforhold"],
  ],
};

const polishTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "terapia-par-dla-founderow-dyrektorow": [
    ["Kryzys związku founderów i liderów: Co pokazują badania", "Kryzys związku founderów i liderów: Co pokazują badania"],
    ["Dlaczego to ma znaczenie: Badania nad skutkami", "Dlaczego to ma znaczenie: Badania nad skutkami"],
    ["Prawdziwe bariery: Dlaczego founderzy i liderzy unikają terapii par", "Prawdziwe bariery: Dlaczego founderzy i liderzy unikają terapii par"],
    ["Jak działa terapia par dla founderów i liderów", "Jak działa terapia par dla founderów i liderów"],
    ["Znalezienie czasu: Jak founderzy ustalają priorytet terapii par", "Znalezienie czasu: Jak founderzy ustalają priorytet terapii par"],
    ["Czego szukać u terapeuty par dla founderów i liderów", "Czego szukać u terapeuty par dla founderów i liderów"],
    ["Drzewo decyzji foundera i lidera", "Drzewo decyzji foundera i lidera"],
    ["FAQ: Terapia par dla founderów i liderów", "FAQ: Terapia par dla founderów i liderów"],
    ["Najważniejsze", "Najważniejsze"],
    ["Gotowi zainwestować w swój związek?", "Gotowi zainwestować w swój związek?"],
    ["Źródła i dalsza lektura", "Źródła i dalsza lektura"],
  ],
  "8-znakow-potrzeba-terapii-par": [
    ["Macie te same konflikty znowu i znowu", "1. Macie te same konflikty znowu i znowu"],
    ["Nie potraficie rozmawiać o trudnych sprawach bez eskalacji", "2. Nie potraficie rozmawiać o trudnych sprawach bez eskalacji"],
    ["Czujecie się bardziej jak wrogowie niż drużyna", "3. Czujecie się bardziej jak wrogowie niż drużyna"],
    ["Jeden z was (lub oboje) zaczął się wycofywać emocjonalnie", "4. Jeden z was (lub oboje) zaczął się wycofywać emocjonalnie"],
    ["Bliskość, seks lub intymność stały się źródłem konfliktu", "5. Bliskość, seks lub intymność stały się źródłem konfliktu"],
    ["Zaufanie zostało złamane", "6. Zaufanie zostało złamane"],
    ["Funkcjonujecie na zewnątrz, ale macie problemy razem", "7. Funkcjonujecie na zewnątrz, ale macie problemy razem"],
    ["Już się zastanawiacie, czy powinniście się rozstać", "8. Już się zastanawiacie, czy powinniście się rozstać"],
    ["Czy potrzebujecie terapii par?", "Czy potrzebujecie terapii par?"],
    ["Kiedy szukać terapii par?", "Kiedy szukać terapii par?"],
    ["Co jeśli tylko jedno z was chce terapii par?", "Co jeśli tylko jedno z was chce terapii par?"],
    ["Kiedy terapia par nie jest właściwym pierwszym krokiem", "Kiedy terapia par nie jest właściwym pierwszym krokiem"],
    ["Częste pytania o terapię par", "Częste pytania o terapię par"],
  ],
};

const norwegianLedeBySlug: Record<string, React.ReactNode> = {
  "parterapi-grundere-ledere": "Parterapi for gründere, ledere og entreprenører kan hjelpe når lange arbeidsdager, lederstress, økonomisk usikkerhet og høyt arbeidspress skaper avstand i parforholdet. Denne guiden forklarer hvordan jobbrelatert stress påvirker forholdet, når parterapi kan være nyttig, og hvordan høytpresterende par kan beskytte nærheten mens de bygger en krevende karriere.",
  "nar-friluftsliv-blir-viktigere-enn-forholdet": "Friluftsliv kan være en sterk kilde til nærhet i et parforhold. Men hva skjer når aktiviteter blir viktigere enn kontakten hjemme? For mange par er turer, ski, hytta, trening og andre friluftsaktiviteter en viktig del av livet sammen. Det kan gi glede, mestring, opplevelser og tid sammen. Men noen ganger kan det også oppstå et mønster der aktivitetene blir stedet dere fortsatt fungerer godt sammen – mens nærheten, samtalene og intimiteten hjemme gradvis forsvinner.",
  "parterapi-i-oslo-tegn": "Vurderer dere parterapi fordi dere har gjentatte konflikter, kommunikasjonsproblemer eller økende avstand i forholdet? Dere trenger ikke å vente til dere står på randen av et samlivsbrudd før dere søker profesjonell hjelp. Her er 8 tegn på at dere trenger parterapi, hva de kan bety for parforholdet, og når det kan være riktig å søke hjelp.",
  "parterapi-i-oslo": (
    <>
      Denne guiden til parterapi i Oslo forklarer når parterapi kan være nyttig, hvilke terapiformer som finnes, og
      hvordan dere velger riktig parterapeut. Du får også vite hva dere kan forvente av parterapi, hva det koster i
      Oslo, og når det kan være riktig å søke hjelp.
    </>
  ),
};

function headingId(children: React.ReactNode) {
  return typeof children === "string"
    ? children.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
}

function formatDate(date: string, lang: "en" | "no" | "pl") {
  const localeMap: Record<string, string> = {
    no: "nb-NO",
    pl: "pl-PL",
    en: "en-US",
  };
  return new Date(date).toLocaleDateString(localeMap[lang] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatWordCount(wordCount: number, lang: "en" | "no" | "pl") {
  const localeMap: Record<string, string> = {
    no: "nb-NO",
    pl: "pl-PL",
    en: "en-US",
  };
  const labelMap: Record<string, string> = {
    no: "ord",
    pl: "słów",
    en: "words",
  };
  return `${new Intl.NumberFormat(localeMap[lang] || "en-US").format(wordCount)} ${labelMap[lang] || "words"}`;
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={headingId(props.children)}
      className="mt-12 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-[#74382f] sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-[Roboto,Arial,sans-serif] text-2xl font-medium text-zinc-900"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className={`mt-6 space-y-3 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838] ${
        JSON.stringify(props.children).includes("☐") || JSON.stringify(props.children).includes("✓")
          ? "list-none pl-0"
          : "list-disc pl-6 marker:text-[#74382f]"
      }`}
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-[#74382f] underline underline-offset-2 hover:no-underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-[Roboto,Arial,sans-serif] font-medium" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left font-[Roboto,Arial,sans-serif] text-[16px] leading-[1.5] text-[#383838]" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="border-b border-zinc-300/80 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900" {...props} />
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <tr className="border-b border-zinc-300/80 align-top" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="px-4 py-3 font-medium" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="px-4 py-3" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const schemaLangByLang: Record<typeof post.lang, string> = { en: "en-US", no: "nb-NO", pl: "pl-PL" };
  const articleLanguages = getTranslationsForPost(post).map((t) => ({
    code: t.lang,
    href: `/blog/${t.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://aetherpractice.com/blog/${post.slug}`,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    inLanguage: schemaLangByLang[post.lang],
    isAccessibleForFree: true,
    keywords: post.keywords,
    author: {
      "@type": "Organization",
      name: "Aether Practice",
      url: "https://aetherpractice.com/",
      "@id": "https://aetherpractice.com/#organization",
    },
    publisher: {
      "@type": "Organization",
      name: "Aether Practice",
      "@id": "https://aetherpractice.com/#organization",
      url: "https://aetherpractice.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://aetherpractice.com/logo-a.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aetherpractice.com/blog/${post.slug}`,
    },
  };

  const faqItems = faqBySlug[post.slug];
  const faqJsonLd = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      }
    : null;

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <BlogShell language={post.lang} articleLanguages={articleLanguages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogViewTracker slug={post.slug} title={post.title} />
      <article lang={htmlLangFor(post.lang)} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
        <Link
          href="/blog"
          className="font-[Roboto,Arial,sans-serif] text-sm text-zinc-500 hover:text-zinc-900"
        >
          {backToBlogLabel[post.lang]}
        </Link>
        <div className="mt-6 flex items-center gap-2 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{formatWordCount(post.wordCount, post.lang)}</span>
        </div>
        <h1 className="mt-3 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium leading-[1.05] tracking-tight text-[#74382f] sm:text-6xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300/80 px-3 py-1 font-[Roboto,Arial,sans-serif] text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.lang === "no" && norwegianLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {norwegianLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "en" && englishLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {englishLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "pl" && polishLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {polishLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "en" && englishTocBySlug[post.slug] && (
          <nav aria-label="Table of Contents" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Table of Contents
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {englishTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "no" && norwegianTocBySlug[post.slug] && (
          <nav aria-label="Innhold" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Innhold
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {norwegianTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "pl" && polishTocBySlug[post.slug] && (
          <nav aria-label="Spis treści" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Spis Treści
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {polishTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "no" && post.slug === "nar-friluftsliv-blir-viktigere-enn-forholdet" && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Da kan dere ende opp som aktivitetskompanjonger snarere enn kjærester.</p>
            <p>Det betyr ikke at friluftslivet er problemet. Spørsmålet er hva som skjer i forholdet når turen er over, og dere ikke lenger har aktiviteten til å holde kontakten i gang.</p>
          </div>
        )}

        {post.lang === "no" && post.slug === "parterapi-i-oslo-tegn" && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Mange par merker problemene lenge før de blir en krise. De samme konfliktene kan gjenta seg, kommunikasjonen kan bli vanskeligere, og nærheten kan gradvis forsvinne.</p>
            <p>Ofte handler det ikke om én stor hendelse, men om mønstre som utvikler seg over tid. Én trekker seg unna, mens den andre prøver stadig hardere å få kontakt. Begge kan sitte igjen med følelsen av å ikke bli forstått.</p>
            <p>Jo tidligere dere oppdager slike mønstre, desto lettere kan det være å ta tak i dem.</p>
          </div>
        )}

        {post.lang === "en" && englishLedeBySlug[post.slug] && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Many couples notice the problems long before they become a crisis. The same conflicts can repeat themselves, communication can become more difficult, and closeness can gradually fade.</p>
            <p>Often it&apos;s not about one big event, but about patterns that develop over time. One person withdraws while the other tries harder and harder to reconnect. Both can end up feeling misunderstood.</p>
            <p>The earlier you recognize these patterns, the easier it can be to address them.</p>
          </div>
        )}

        {post.lang === "pl" && polishLedeBySlug[post.slug] && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Wiele par zauważa problemy na długo zanim staną się kryzysem. Te same konflikty mogą się powtarzać, komunikacja może stawać się coraz trudniejsza, a bliskość może stopniowo zanikać.</p>
            <p>Często nie chodzi o jedno duże wydarzenie, lecz o wzorce, które rozwijają się z czasem. Jedna osoba się wycofuje, podczas gdy druga coraz mocniej stara się nawiązać kontakt. Obie strony mogą czuć się niezrozumiane.</p>
            <p>Im wcześniej rozpoznacie takie wzorce, tym łatwiej może być się nimi zająć.</p>
          </div>
        )}

        <div className="mt-4">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}
      </article>
    </BlogShell>
  );
}
