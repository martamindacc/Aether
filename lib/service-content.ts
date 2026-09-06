export const languages = [
  { code: "en", label: "EN" },
  { code: "no", label: "NO" },
  { code: "pl", label: "PL" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export type ProcessStep = { number: string; title: string; description: string };
export type Outcome = { title: string; description: string };

export type ServicePageContent = {
  title: string;
  intro: string;
  panels: { title: string; description: string }[];
  processHeading: string;
  process: ProcessStep[];
  outcomesHeading: string;
  outcomes: Outcome[];
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
};

export type AboutContent = {
  title: string;
  intro: string;
  panels: { title: string; description: string }[];
  valuesHeading: string;
  values: { title: string; description: string }[];
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
};

export type ContactContent = {
  title: string;
  intro: string;
  details: { label: string; value: string }[];
  hoursHeading: string;
  hours: string;
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
};

export const navContent: Record<
  LanguageCode,
  {
    bookNow: string;
    menuHeading: string;
    menuLinks: { label: string; href: string }[];
    companyHeading: string;
    companyLinks: { label: string; href: string }[];
  }
> = {
  en: {
    bookNow: "Book Now",
    menuHeading: "Services",
    menuLinks: [
      { label: "Individual", href: "/individual-therapy" },
      { label: "Couples", href: "/couples-therapy" },
      { label: "Family", href: "/family-support" },
      { label: "Executive & Founder Work", href: "/executive-founder-work" },
    ],
    companyHeading: "Company",
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  no: {
    bookNow: "Bestill Nå",
    menuHeading: "Tjenester",
    menuLinks: [
      { label: "Individuell terapi", href: "/individual-therapy" },
      { label: "Parterapi", href: "/couples-therapy" },
      { label: "Familieterapi", href: "/family-support" },
      { label: "Leder- og Grunnleggerarbeid", href: "/executive-founder-work" },
    ],
    companyHeading: "Selskap",
    companyLinks: [
      { label: "Om Oss", href: "/about" },
      { label: "Kontakt", href: "/contact" },
    ],
  },
  pl: {
    bookNow: "Zarezerwuj",
    menuHeading: "Usługi",
    menuLinks: [
      { label: "Indywidualne", href: "/individual-therapy" },
      { label: "Pary", href: "/couples-therapy" },
      { label: "Rodzina", href: "/family-support" },
      { label: "Praca z Liderami i Założycielami", href: "/executive-founder-work" },
    ],
    companyHeading: "Firma",
    companyLinks: [
      { label: "O Nas", href: "/about" },
      { label: "Kontakt", href: "/contact" },
    ],
  },
};

export const individualTherapyContent: Record<LanguageCode, ServicePageContent> = {
  en: {
    title: "Individual",
    intro:
      "A dedicated space to think clearly, understand your own patterns, and move forward with intention. This is coaching built for people who are already capable — and want a sharper, more deliberate version of the life they're building.",
    panels: [
      {
        title: "A space built around you",
        description:
          "Bring the questions, transitions, and patterns you're ready to understand. Every session is collaborative, unhurried, and shaped entirely around your priorities and pace.",
      },
      {
        title: "Insight that turns into action",
        description:
          "We don't stop at reflection. Every conversation is paired with practical steps, so the clarity you gain here shows up in how you think, decide, and live outside the session.",
      },
    ],
    processHeading: "How the work unfolds",
    process: [
      {
        number: "01",
        title: "Discovery Session",
        description:
          "An unhurried first conversation to understand where you stand today — what you want more of, what's been getting in the way, and what a meaningful outcome would look like for you.",
      },
      {
        number: "02",
        title: "Personal Roadmap",
        description:
          "We translate that conversation into a clear focus for the work — the patterns worth examining first and the outcomes we'll measure progress against.",
      },
      {
        number: "03",
        title: "Guided Sessions",
        description:
          "Structured, one-to-one sessions that combine reflection with practical tools, so every conversation moves you closer to the clarity and confidence you're building toward.",
      },
      {
        number: "04",
        title: "Lasting Rhythm",
        description:
          "We close with a set of tools and habits calibrated to your life, so the momentum you've built keeps compounding long after our work together ends.",
      },
    ],
    outcomesHeading: "What changes for you",
    outcomes: [
      {
        title: "Clarity under pressure",
        description:
          "Learn to separate the signal from the noise, so decisions and setbacks feel manageable rather than overwhelming.",
      },
      {
        title: "Confidence in your own judgment",
        description:
          "Build a stronger, quieter sense of trust in yourself — one that holds steady in moments of doubt or transition.",
      },
      {
        title: "A life that fits, not just functions",
        description:
          "Move from simply getting through the day to shaping a rhythm of work, rest, and relationships that actually feels like yours.",
      },
    ],
    ctaHeading: "The first session is where clarity begins.",
    ctaSubtext:
      "Start with a short, unhurried conversation to see if this is the right fit — no pressure, no commitment beyond that first hour.",
    ctaButton: "Book your first session",
  },
  no: {
    title: "Individuell terapi",
    intro:
      "Et dedikert rom for å tenke klart, forstå dine egne mønstre, og gå fremover med hensikt. Dette er coaching bygget for mennesker som allerede er kapable — og vil ha en skarpere, mer bevisst versjon av livet de bygger.",
    panels: [
      {
        title: "Et rom bygget rundt deg",
        description:
          "Ta med spørsmålene, overgangene og mønstrene du er klar til å forstå. Hver samtale er samarbeidsbasert, avslappet, og formet helt etter dine prioriteringer og tempo.",
      },
      {
        title: "Innsikt som blir til handling",
        description:
          "Vi stopper ikke ved refleksjon. Hver samtale kombineres med praktiske steg, slik at klarheten du får her viser seg i hvordan du tenker, bestemmer og lever utenfor timen.",
      },
    ],
    processHeading: "Slik utfolder arbeidet seg",
    process: [
      {
        number: "01",
        title: "Oppstartssamtale",
        description:
          "En avslappet, første samtale for å forstå hvor du står i dag — hva du vil ha mer av, hva som har stått i veien, og hvordan et meningsfullt resultat ser ut for deg.",
      },
      {
        number: "02",
        title: "Personlig Veikart",
        description:
          "Vi omsetter samtalen til et klart fokus for arbeidet — mønstrene som er verdt å se på først og resultatene vi måler fremgang mot.",
      },
      {
        number: "03",
        title: "Veiledede Samtaler",
        description:
          "Strukturerte, individuelle samtaler som kombinerer refleksjon med praktiske verktøy, slik at hver samtale bringer deg nærmere klarheten og selvtilliten du bygger mot.",
      },
      {
        number: "04",
        title: "Varig Rytme",
        description:
          "Vi avslutter med verktøy og vaner tilpasset ditt liv, slik at momentumet du har bygget fortsetter å vokse lenge etter at arbeidet vårt er over.",
      },
    ],
    outcomesHeading: "Det som endrer seg for deg",
    outcomes: [
      {
        title: "Klarhet under press",
        description:
          "Lær å skille signalet fra støyen, slik at beslutninger og motgang føles overkommelig i stedet for overveldende.",
      },
      {
        title: "Tillit til egen dømmekraft",
        description:
          "Bygg en sterkere, stillere følelse av tillit til deg selv — en som holder seg stødig i øyeblikk av tvil eller overgang.",
      },
      {
        title: "Et liv som passer, ikke bare fungerer",
        description:
          "Gå fra å bare komme deg gjennom dagen til å forme en rytme av arbeid, hvile og relasjoner som faktisk føles som din egen.",
      },
    ],
    ctaHeading: "Den første timen er der klarheten begynner.",
    ctaSubtext:
      "Start med en kort, avslappet samtale for å se om dette er riktig for deg — ingen press, ingen forpliktelse utover den første timen.",
    ctaButton: "Book din første time",
  },
  pl: {
    title: "Indywidualne",
    intro:
      "Dedykowana przestrzeń, by myśleć jasno, rozumieć własne wzorce i poruszać się naprzód z intencją. To coaching stworzony dla ludzi, którzy są już zdolni — i chcą bardziej świadomej wersji życia, które budują.",
    panels: [
      {
        title: "Przestrzeń zbudowana wokół Ciebie",
        description:
          "Przynieś pytania, zmiany i wzorce, które jesteś gotów zrozumieć. Każda sesja jest wspólna, spokojna i całkowicie ukształtowana wokół Twoich priorytetów i tempa.",
      },
      {
        title: "Wgląd, który staje się działaniem",
        description:
          "Nie zatrzymujemy się na refleksji. Każda rozmowa jest połączona z praktycznymi krokami, dzięki czemu jasność, którą zyskujesz, przejawia się w tym, jak myślisz, decydujesz i żyjesz poza sesją.",
      },
    ],
    processHeading: "Jak przebiega praca",
    process: [
      {
        number: "01",
        title: "Sesja Wprowadzająca",
        description:
          "Spokojna, pierwsza rozmowa, by zrozumieć, gdzie jesteś dzisiaj — czego chcesz więcej, co stało na przeszkodzie i jak wygląda dla Ciebie sensowny rezultat.",
      },
      {
        number: "02",
        title: "Osobista Mapa Drogowa",
        description:
          "Przekładamy tę rozmowę na jasny kierunek pracy — wzorce, które warto zbadać najpierw, i rezultaty, względem których będziemy mierzyć postępy.",
      },
      {
        number: "03",
        title: "Sesje Prowadzone",
        description:
          "Strukturyzowane, indywidualne sesje łączące refleksję z praktycznymi narzędziami, dzięki czemu każda rozmowa przybliża Cię do jasności i pewności, którą budujesz.",
      },
      {
        number: "04",
        title: "Trwały Rytm",
        description:
          "Zamykamy pracę zestawem narzędzi i nawyków dostosowanych do Twojego życia, dzięki czemu zbudowany impet rośnie długo po zakończeniu naszej współpracy.",
      },
    ],
    outcomesHeading: "Co się dla Ciebie zmienia",
    outcomes: [
      {
        title: "Jasność pod presją",
        description:
          "Nauczysz się odróżniać sygnał od szumu, dzięki czemu decyzje i porażki będą wydawać się możliwe do opanowania, a nie przytłaczające.",
      },
      {
        title: "Pewność własnego osądu",
        description:
          "Zbuduj silniejsze, spokojniejsze poczucie zaufania do siebie — takie, które trwa w chwilach wątpliwości lub zmiany.",
      },
      {
        title: "Życie, które pasuje, a nie tylko funkcjonuje",
        description:
          "Przejdź od zwykłego przetrwania dnia do kształtowania rytmu pracy, odpoczynku i relacji, który naprawdę wydaje się Twój.",
      },
    ],
    ctaHeading: "Pierwsza sesja to miejsce, gdzie zaczyna się jasność.",
    ctaSubtext:
      "Zacznij od krótkiej, spokojnej rozmowy, by sprawdzić, czy to odpowiednie rozwiązanie — bez presji, bez zobowiązań poza tą pierwszą godziną.",
    ctaButton: "Zarezerwuj pierwszą sesję",
  },
};

export const couplesTherapyContent: Record<LanguageCode, ServicePageContent> = {
  en: {
    title: "Couples",
    intro:
      "A dedicated space for two people to understand how they truly work together — repair the pattern underneath the conflict, and rebuild a partnership that feels steady, honest, and shared.",
    panels: [
      {
        title: "A space for both of you",
        description:
          "Every session is shared, balanced, and structured so both voices are heard equally — with a clear focus on what moves your relationship forward, not who's right.",
      },
      {
        title: "Building shared understanding",
        description:
          "We help you see the pattern behind the disagreement, so you can respond to each other with more clarity, patience, and lasting trust — long after the conversation ends.",
      },
    ],
    processHeading: "How the work unfolds",
    process: [
      {
        number: "01",
        title: "Discovery Conversation",
        description:
          "A relaxed, structured conversation to understand where you both stand today — what's working, what feels stuck, and what you want to build together.",
      },
      {
        number: "02",
        title: "Shared Roadmap",
        description:
          "We map the patterns underneath the friction and agree on a clear focus for the work — so every session moves you both in the same direction.",
      },
      {
        number: "03",
        title: "Guided Sessions",
        description:
          "Structured, collaborative sessions where you practice new ways of communicating, listening, and resolving disagreement in real time.",
      },
      {
        number: "04",
        title: "Lasting Rhythm",
        description:
          "We close with practical tools and a rhythm you can carry forward — so the progress you build together keeps compounding after the work ends.",
      },
    ],
    outcomesHeading: "What changes for you both",
    outcomes: [
      {
        title: "Communication that actually lands",
        description:
          "Learn to say the hard thing without it becoming a fight, and to hear each other without getting defensive.",
      },
      {
        title: "Trust rebuilt on solid ground",
        description:
          "Move past old resentments with a shared understanding of what happened and why — not just an agreement to move on.",
      },
      {
        title: "A partnership, not a negotiation",
        description:
          "Replace the sense of scorekeeping with a rhythm where you're solving problems together, not against each other.",
      },
    ],
    ctaHeading: "The strongest relationships are the ones that get worked on.",
    ctaSubtext:
      "Start with a joint discovery conversation to see if this is the right fit for you both — no pressure, no commitment beyond that first hour.",
    ctaButton: "Book your first session",
  },
  no: {
    title: "Parterapi",
    intro:
      "Et dedikert rom for to mennesker til å forstå hvordan de virkelig fungerer sammen — reparere mønsteret under konflikten, og gjenoppbygge et partnerskap som føles stødig, ærlig og delt.",
    panels: [
      {
        title: "Et rom for dere begge",
        description:
          "Hver samtale er delt, balansert og strukturert slik at begge stemmer blir hørt likt — med et klart fokus på hva som fører relasjonen fremover, ikke hvem som har rett.",
      },
      {
        title: "Bygge felles forståelse",
        description:
          "Vi hjelper deg å se mønsteret bak uenigheten, slik at dere kan svare hverandre med mer klarhet, tålmodighet og varig tillit — lenge etter at samtalen er over.",
      },
    ],
    processHeading: "Slik utfolder arbeidet seg",
    process: [
      {
        number: "01",
        title: "Oppstartssamtale",
        description:
          "En avslappet, strukturert samtale for å forstå hvor dere begge står i dag — hva som fungerer, hva som føles fastlåst, og hva dere vil bygge sammen.",
      },
      {
        number: "02",
        title: "Felles Veikart",
        description:
          "Vi kartlegger mønstrene bak friksjonen og blir enige om et klart fokus for arbeidet — slik at hver samtale beveger dere begge i samme retning.",
      },
      {
        number: "03",
        title: "Veiledede Samtaler",
        description:
          "Strukturerte, samarbeidende samtaler der dere øver på nye måter å kommunisere, lytte og løse uenighet i sanntid.",
      },
      {
        number: "04",
        title: "Varig Rytme",
        description:
          "Vi avslutter med praktiske verktøy og en rytme dere kan ta med videre — slik at fremgangen dere har bygget sammen fortsetter etter arbeidet er over.",
      },
    ],
    outcomesHeading: "Det som endrer seg for dere begge",
    outcomes: [
      {
        title: "Kommunikasjon som faktisk lander",
        description:
          "Lær å si det vanskelige uten at det blir en krangel, og å høre hverandre uten å bli defensiv.",
      },
      {
        title: "Tillit gjenoppbygget på solid grunn",
        description:
          "Legg gamle bitterheter bak dere med en delt forståelse av hva som skjedde og hvorfor — ikke bare en avtale om å gå videre.",
      },
      {
        title: "Et partnerskap, ikke en forhandling",
        description:
          "Erstatt følelsen av å telle poeng med en rytme der dere løser problemer sammen, ikke mot hverandre.",
      },
    ],
    ctaHeading: "De sterkeste relasjonene er de det jobbes med.",
    ctaSubtext:
      "Start med en felles oppstartssamtale for å se om dette er riktig for dere begge — ingen press, ingen forpliktelse utover den første timen.",
    ctaButton: "Book din første time",
  },
  pl: {
    title: "Pary",
    intro:
      "Dedykowana przestrzeń dla dwóch osób, by zrozumieć, jak naprawdę funkcjonują razem — naprawić wzorzec leżący u podstaw konfliktu i odbudować partnerstwo, które jest stabilne, szczere i wspólne.",
    panels: [
      {
        title: "Przestrzeń dla was obu",
        description:
          "Każda sesja jest wspólna, zrównoważona i ustrukturyzowana tak, by oba głosy były słyszane równo — z jasnym skupieniem na tym, co przesuwa relację do przodu, a nie na tym, kto ma rację.",
      },
      {
        title: "Budowanie wspólnego zrozumienia",
        description:
          "Pomagamy zobaczyć wzorzec kryjący się za niezgodą, dzięki czemu możecie odpowiadać sobie z większą jasnością, cierpliwością i trwałym zaufaniem — długo po zakończeniu rozmowy.",
      },
    ],
    processHeading: "Jak przebiega praca",
    process: [
      {
        number: "01",
        title: "Rozmowa Wprowadzająca",
        description:
          "Spokojna, ustrukturyzowana rozmowa, by zrozumieć, gdzie oboje jesteście dzisiaj — co działa, co wydaje się zablokowane i co chcecie zbudować razem.",
      },
      {
        number: "02",
        title: "Wspólna Mapa Drogowa",
        description:
          "Mapujemy wzorce leżące pod napięciem i uzgadniamy jasny kierunek pracy — dzięki czemu każda sesja przesuwa was oboje w tym samym kierunku.",
      },
      {
        number: "03",
        title: "Sesje Prowadzone",
        description:
          "Strukturyzowane, wspólne sesje, w których ćwiczycie nowe sposoby komunikowania się, słuchania i rozwiązywania niezgody w czasie rzeczywistym.",
      },
      {
        number: "04",
        title: "Trwały Rytm",
        description:
          "Zamykamy pracę praktycznymi narzędziami i rytmem, który możecie zabrać ze sobą — dzięki czemu wspólny postęp rośnie długo po zakończeniu pracy.",
      },
    ],
    outcomesHeading: "Co się zmienia dla was obu",
    outcomes: [
      {
        title: "Komunikacja, która naprawdę trafia",
        description:
          "Naucz się mówić trudne rzeczy bez wywoływania kłótni i słyszeć się nawzajem bez stawania w defensywie.",
      },
      {
        title: "Zaufanie odbudowane na solidnym gruncie",
        description:
          "Przejdźcie dalej od starych żali ze wspólnym zrozumieniem tego, co się stało i czemu — nie tylko zgodą, by iść dalej.",
      },
      {
        title: "Partnerstwo, nie negocjacje",
        description:
          "Zastąpcie poczucie liczenia punktów rytmem, w którym rozwiązujecie problemy razem, a nie przeciwko sobie.",
      },
    ],
    ctaHeading: "Najsilniejsze relacje to te, nad którymi się pracuje.",
    ctaSubtext:
      "Zacznijcie od wspólnej rozmowy wprowadzającej, by sprawdzić, czy to odpowiednie rozwiązanie dla was obu — bez presji, bez zobowiązań poza tą pierwszą godziną.",
    ctaButton: "Zarezerwujcie pierwszą sesję",
  },
};

export const executiveFounderContent: Record<LanguageCode, ServicePageContent> = {
  en: {
    title: "Executive & Founder Work",
    intro:
      "Confidential, high-caliber support at the level where decisions and isolation actually happen — built for founders and executives carrying weight the role was never designed to make space for.",
    panels: [
      {
        title: "A space built for the role",
        description:
          "Bring the pressure, the pace, and the decisions you can't talk through anywhere else. Sessions are direct, strictly confidential, and built entirely around your reality.",
      },
      {
        title: "Sharper judgment, faster",
        description:
          "We work on the thinking behind your decisions, so you carry more clarity, composure, and precision into the moments that matter most for your business and your people.",
      },
    ],
    processHeading: "How the work unfolds",
    process: [
      {
        number: "01",
        title: "Context Session",
        description:
          "A confidential first conversation to understand the weight you're carrying — the decisions, the isolation, and the role's blind spots.",
      },
      {
        number: "02",
        title: "Focus Areas",
        description:
          "We identify the two or three areas where a shift in thinking or approach will create the most leverage across your role.",
      },
      {
        number: "03",
        title: "Working Sessions",
        description:
          "Structured, high-trust sessions built around real decisions in front of you — not theory. You leave with sharper judgment each time.",
      },
      {
        number: "04",
        title: "Sustained Support",
        description:
          "An ongoing rhythm that gives you a steady space to think out loud, pressure-test decisions, and stay resourced as the role evolves.",
      },
    ],
    outcomesHeading: "What changes for you",
    outcomes: [
      {
        title: "Decisions made with less noise",
        description:
          "Cut through the pressure and second-guessing to reach the same conclusion faster, with more conviction behind it.",
      },
      {
        title: "A confidential thinking partner",
        description:
          "A space to say the unfiltered version of what's actually going on — without it becoming office politics or a liability.",
      },
      {
        title: "Sustainable at the pace you're growing",
        description:
          "Build the internal steadiness to keep performing at a high level without the role quietly costing you everything else.",
      },
    ],
    ctaHeading: "The best leaders build in a thinking partner. Start here.",
    ctaSubtext:
      "Start with a confidential context session to see if this is the right fit — no pressure, no commitment beyond that first hour.",
    ctaButton: "Book your first session",
  },
  no: {
    title: "Leder- og Grunnleggerarbeid",
    intro:
      "Konfidensiell støtte av høy kaliber på nivået der beslutninger og isolasjon faktisk skjer — bygget for gründere og ledere som bærer en vekt rollen aldri var designet for å gi plass til.",
    panels: [
      {
        title: "Et rom bygget for rollen",
        description:
          "Ta med presset, tempoet og beslutningene du ikke kan snakke gjennom noe annet sted. Samtalene er direkte, strengt konfidensielle, og bygget helt rundt din virkelighet.",
      },
      {
        title: "Skarpere dømmekraft, raskere",
        description:
          "Vi arbeider med tenkningen bak beslutningene dine, slik at du bringer mer klarhet, fatning og presisjon inn i øyeblikkene som betyr mest for virksomheten og menneskene dine.",
      },
    ],
    processHeading: "Slik utfolder arbeidet seg",
    process: [
      {
        number: "01",
        title: "Kontekstsamtale",
        description:
          "En konfidensiell, første samtale for å forstå vekten du bærer — beslutningene, isolasjonen, og rollens blindsoner.",
      },
      {
        number: "02",
        title: "Fokusområder",
        description:
          "Vi identifiserer de to eller tre områdene der et skifte i tenkning eller tilnærming vil skape mest gjennomslag i rollen din.",
      },
      {
        number: "03",
        title: "Arbeidssamtaler",
        description:
          "Strukturerte samtaler med høy tillit, bygget rundt reelle beslutninger foran deg — ikke teori. Du går ut med skarpere dømmekraft hver gang.",
      },
      {
        number: "04",
        title: "Varig Støtte",
        description:
          "En løpende rytme som gir deg et stødig rom for å tenke høyt, stressteste beslutninger, og forbli ressurssterk mens rollen utvikler seg.",
      },
    ],
    outcomesHeading: "Det som endrer seg for deg",
    outcomes: [
      {
        title: "Beslutninger tatt med mindre støy",
        description:
          "Skjær gjennom presset og tvilen for å nå samme konklusjon raskere, med mer overbevisning bak den.",
      },
      {
        title: "En konfidensiell tenkepartner",
        description:
          "Et rom for å si den ufiltrerte versjonen av hva som faktisk skjer — uten at det blir kontorpolitikk eller en risiko.",
      },
      {
        title: "Bærekraftig i tempoet du vokser",
        description:
          "Bygg den interne stødigheten til å fortsette å yte på høyt nivå uten at rollen stille koster deg alt annet.",
      },
    ],
    ctaHeading: "De beste lederne bygger inn en tenkepartner. Start her.",
    ctaSubtext:
      "Start med en konfidensiell kontekstsamtale for å se om dette er riktig for deg — ingen press, ingen forpliktelse utover den første timen.",
    ctaButton: "Book din første time",
  },
  pl: {
    title: "Praca z Liderami i Założycielami",
    intro:
      "Poufne wsparcie najwyższej klasy na poziomie, na którym faktycznie zachodzą decyzje i izolacja — stworzone dla założycieli i liderów niosących ciężar, na który rola nigdy nie została zaprojektowana, by dać miejsce.",
    panels: [
      {
        title: "Przestrzeń zbudowana dla tej roli",
        description:
          "Przynieś presję, tempo i decyzje, o których nie możesz porozmawiać nigdzie indziej. Sesje są bezpośrednie, ściśle poufne i zbudowane całkowicie wokół Twojej rzeczywistości.",
      },
      {
        title: "Ostrzejszy osąd, szybciej",
        description:
          "Pracujemy nad myśleniem stojącym za Twoimi decyzjami, dzięki czemu wnosisz więcej jasności, spokoju i precyzji w chwile, które mają największe znaczenie dla Twojej firmy i ludzi.",
      },
    ],
    processHeading: "Jak przebiega praca",
    process: [
      {
        number: "01",
        title: "Sesja Kontekstowa",
        description:
          "Poufna, pierwsza rozmowa, by zrozumieć ciężar, który niesiesz — decyzje, izolację i martwe punkty roli.",
      },
      {
        number: "02",
        title: "Obszary Skupienia",
        description:
          "Identyfikujemy dwa lub trzy obszary, w których zmiana myślenia lub podejścia stworzy największy wpływ w Twojej roli.",
      },
      {
        number: "03",
        title: "Sesje Pracujące",
        description:
          "Ustrukturyzowane sesje o wysokim poziomie zaufania, zbudowane wokół rzeczywistych decyzji przed Tobą — nie teorii. Każda kończy się ostrzejszym osądem.",
      },
      {
        number: "04",
        title: "Trwałe Wsparcie",
        description:
          "Ciągły rytm, który daje Ci stabilną przestrzeń do myślenia na głos, testowania decyzji pod presją i pozostania zasobnym, gdy rola się rozwija.",
      },
    ],
    outcomesHeading: "Co się dla Ciebie zmienia",
    outcomes: [
      {
        title: "Decyzje podejmowane z mniejszym szumem",
        description:
          "Przebij się przez presję i wahanie, by szybciej dojść do tego samego wniosku, z większym przekonaniem za nim.",
      },
      {
        title: "Poufny partner do myślenia",
        description:
          "Przestrzeń, by powiedzieć niefiltrowaną wersję tego, co faktycznie się dzieje — bez ryzyka, że stanie się to polityką biurową.",
      },
      {
        title: "Trwałe tempo, w którym rośniesz",
        description:
          "Zbuduj wewnętrzną stabilność, by nadal działać na wysokim poziomie, bez tego, że rola po cichu kosztuje Cię wszystko inne.",
      },
    ],
    ctaHeading: "Najlepsi liderzy budują w sobie partnera do myślenia. Zacznij tutaj.",
    ctaSubtext:
      "Zacznij od poufnej sesji kontekstowej, by sprawdzić, czy to odpowiednie rozwiązanie — bez presji, bez zobowiązań poza tą pierwszą godziną.",
    ctaButton: "Zarezerwuj pierwszą sesję",
  },
};

export const aboutContent: Record<LanguageCode, AboutContent> = {
  en: {
    title: "About Aether Practice",
    intro:
      "Aether Practice was built on a simple belief: real change happens when care is grounded in both science and genuine human understanding. We work with individuals, couples, families, and leaders who are ready to face what's underneath the surface.",
    panels: [
      {
        title: "Our approach",
        description:
          "We combine evidence-based methods with an unhurried, relational style of care. Every session is tailored to where you actually are — not a script we run regardless of who's in front of us.",
      },
      {
        title: "Who we work with",
        description:
          "People carrying real weight: anxiety, grief, relationship strain, family friction, or the isolation that comes with leading. You don't need a crisis to start — you need a reason.",
      },
    ],
    valuesHeading: "What guides the work",
    values: [
      {
        title: "Grounded in evidence",
        description: "Methods drawn from clinical research, not trends.",
      },
      {
        title: "Genuinely confidential",
        description: "A space where the unfiltered version of things is safe to say.",
      },
      {
        title: "Built around you",
        description: "No fixed formula — the pace and focus follow your actual life.",
      },
    ],
    ctaHeading: "Ready to start the conversation?",
    ctaSubtext:
      "Book an initial session and see if it's the right fit — no pressure, no commitment beyond that first hour.",
    ctaButton: "Book a session",
  },
  no: {
    title: "Om Aether Practice",
    intro:
      "Aether Practice ble bygget på en enkel tro: reell endring skjer når omsorg er forankret i både vitenskap og genuin menneskelig forståelse. Vi arbeider med enkeltpersoner, par, familier og ledere som er klare for å møte det som ligger under overflaten.",
    panels: [
      {
        title: "Vår tilnærming",
        description:
          "Vi kombinerer evidensbaserte metoder med en avslappet, relasjonell omsorgsstil. Hver sesjon er skreddersydd til hvor du faktisk er — ikke et manus vi kjører uansett hvem som sitter foran oss.",
      },
      {
        title: "Hvem vi arbeider med",
        description:
          "Mennesker som bærer reell vekt: angst, sorg, relasjonsbelastning, familiefriksjon, eller isolasjonen som følger med å lede. Du trenger ikke en krise for å starte — du trenger en grunn.",
      },
    ],
    valuesHeading: "Hva som styrer arbeidet",
    values: [
      {
        title: "Forankret i evidens",
        description: "Metoder hentet fra klinisk forskning, ikke trender.",
      },
      {
        title: "Genuint konfidensielt",
        description: "Et rom hvor den ufiltrerte versjonen av ting er trygg å si.",
      },
      {
        title: "Bygget rundt deg",
        description: "Ingen fast formel — tempoet og fokuset følger ditt faktiske liv.",
      },
    ],
    ctaHeading: "Klar til å starte samtalen?",
    ctaSubtext:
      "Bestill en innledende sesjon og se om det er riktig for deg — uten press, uten forpliktelse utover den første timen.",
    ctaButton: "Bestill en sesjon",
  },
  pl: {
    title: "O Aether Practice",
    intro:
      "Aether Practice powstało z prostego przekonania: prawdziwa zmiana dzieje się, gdy opieka jest zakorzeniona zarówno w nauce, jak i w autentycznym ludzkim zrozumieniu. Pracujemy z osobami indywidualnymi, parami, rodzinami i liderami gotowymi zmierzyć się z tym, co jest pod powierzchnią.",
    panels: [
      {
        title: "Nasze podejście",
        description:
          "Łączymy metody oparte na dowodach z niespieszonym, relacyjnym stylem opieki. Każda sesja jest dostosowana do tego, gdzie faktycznie jesteś — nie jest to scenariusz, który stosujemy niezależnie od tego, kto jest przed nami.",
      },
      {
        title: "Z kim pracujemy",
        description:
          "Z ludźmi noszącymi realny ciężar: lęk, żal, napięcie w relacji, tarcia rodzinne lub izolację, która towarzyszy przywództwu. Nie musisz mieć kryzysu, aby zacząć — potrzebujesz powodu.",
      },
    ],
    valuesHeading: "Co kieruje naszą pracą",
    values: [
      {
        title: "Zakorzenione w dowodach",
        description: "Metody zaczerpnięte z badań klinicznych, nie z trendów.",
      },
      {
        title: "Naprawdę poufne",
        description: "Miejsce, w którym bezpiecznie można powiedzieć niefiltrowaną wersję rzeczy.",
      },
      {
        title: "Zbudowane wokół Ciebie",
        description: "Brak stałej formuły — tempo i skupienie wynikają z Twojego rzeczywistego życia.",
      },
    ],
    ctaHeading: "Gotowy zacząć rozmowę?",
    ctaSubtext:
      "Zarezerwuj pierwszą sesję i sprawdź, czy to odpowiednie rozwiązanie — bez presji, bez zobowiązań poza tą pierwszą godziną.",
    ctaButton: "Zarezerwuj sesję",
  },
};

export const contactContent: Record<LanguageCode, ContactContent> = {
  en: {
    title: "Contact",
    intro:
      "Have a question before booking, or want to talk through which service is the right fit? Reach out — we respond to every message.",
    details: [
      { label: "Email", value: "hello@aetherpractice.com" },
      { label: "Phone", value: "+1 (555) 012-3456" },
      { label: "Location", value: "Sessions held in person and online" },
    ],
    hoursHeading: "Availability",
    hours: "Monday – Friday, 9:00 – 18:00",
    ctaHeading: "Prefer to just get started?",
    ctaSubtext: "Skip the email and book your first session directly.",
    ctaButton: "Book a session",
  },
  no: {
    title: "Kontakt",
    intro:
      "Har du et spørsmål før du bestiller, eller vil du snakke om hvilken tjeneste som passer best? Ta kontakt — vi svarer på alle meldinger.",
    details: [
      { label: "E-post", value: "hello@aetherpractice.com" },
      { label: "Telefon", value: "+1 (555) 012-3456" },
      { label: "Sted", value: "Sesjoner holdes fysisk og digitalt" },
    ],
    hoursHeading: "Tilgjengelighet",
    hours: "Mandag – fredag, 09:00 – 18:00",
    ctaHeading: "Vil du bare komme i gang?",
    ctaSubtext: "Hopp over e-posten og bestill din første sesjon direkte.",
    ctaButton: "Bestill en sesjon",
  },
  pl: {
    title: "Kontakt",
    intro:
      "Masz pytanie przed rezerwacją lub chcesz porozmawiać, która usługa będzie odpowiednia? Napisz do nas — odpowiadamy na każdą wiadomość.",
    details: [
      { label: "E-mail", value: "hello@aetherpractice.com" },
      { label: "Telefon", value: "+1 (555) 012-3456" },
      { label: "Lokalizacja", value: "Sesje odbywają się osobiście i online" },
    ],
    hoursHeading: "Dostępność",
    hours: "Poniedziałek – piątek, 9:00 – 18:00",
    ctaHeading: "Chcesz po prostu zacząć?",
    ctaSubtext: "Pomiń e-mail i zarezerwuj pierwszą sesję bezpośrednio.",
    ctaButton: "Zarezerwuj sesję",
  },
};
