import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogShell } from "@/components/blog-shell";
import { BlogCta } from "@/components/blog-cta";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { getTranslationsForPost, htmlLangFor, type BlogPost as BlogPostData, type BlogPostMeta } from "@/lib/blog";
import { extractFaq } from "@/lib/blog-faq";
import { formatReadingTime } from "@/lib/reading-time";
import { RelatedPosts } from "@/components/related-posts";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { localizedPaths, postPath } from "@/lib/locale-routes";
import type { LanguageCode } from "@/lib/service-content";

const ogLocale: Record<LanguageCode, string> = { no: "nb_NO", en: "en_US" };

/** Metadata for a post page: canonical, hreflang to its genuine translations, Open Graph article tags. */
export function postMetadata(post: BlogPostData): Metadata {

  const translations = getTranslationsForPost(post);
  const enTranslation = translations.find((t) => t.lang === "en");
  const languages =
    translations.length > 1
      ? {
          ...Object.fromEntries(translations.map((t) => [t.lang, postPath(t)])),
          ...(enTranslation ? { "x-default": postPath(enTranslation) } : {}),
        }
      : { [post.lang]: postPath(post) };

  return pageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    path: postPath(post),
    locale: ogLocale[post.lang],
    languages,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    tags: post.tags,
    image: post.image,
  });
}

const backToBlogLabel: Record<LanguageCode, string> = {
  en: "← Back to Blog",
  no: "← Tilbake til bloggen",
};

const englishTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "couples-therapy-founders-executives": [
    ["Quick Answer: Why Does Work Take the Relationship?", "Quick Answer: Why Does Work Take the Relationship?"],
    ["What It Looks Like: Five Things We Hear Often", "What It Looks Like: Five Things We Hear Often"],
    ["Why Standard Relationship Advice Misses the Mark", "Why Standard Relationship Advice Misses the Mark"],
    ["Seven Patterns in Couples with High-Pressure Careers", "Seven Patterns in Couples with High-Pressure Careers"],
    ["The Founder Couple: When the Company Is the Third Partner", "The Founder Couple: When the Company Is the Third Partner"],
    ["The Executive Couple: When One Partner Carries a Weight the Other Can't See", "The Executive Couple: When One Partner Carries a Weight the Other Can't See"],
    ["The Asymmetry: When One Partner Is Always \"On\" and the Other Carries the Rest", "The Asymmetry: When One Partner Is Always \"On\" and the Other Carries the Rest"],
    ["Self-Check: Has Work Taken the Relationship?", "Self-Check: Has Work Taken the Relationship?"],
    ["What Doesn't Help", "What Doesn't Help"],
    ["What Does Help: Six Moves for Couples with High-Pressure Careers", "What Does Help: Six Moves for Couples with High-Pressure Careers"],
    ["How Couples Therapy for Founders and Executives Differs from Standard Couples Therapy", "How Couples Therapy for Founders and Executives Differs from Standard Couples Therapy"],
    ["FAQ: Couples Therapy for Founders and Executives", "FAQ: Couples Therapy for Founders and Executives"],
    ["About Aether Practice", "About Aether Practice"],
    ["Take the Next Step", "Take the Next Step"],
    ["Research & Further Reading", "Research & Further Reading"],
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
  "couples-therapy-after-infidelity": [
    ["The first 72 hours: don't decide anything", "The first 72 hours: don't decide anything"],
    ["The first weeks: instability, and what helps in it", "The first weeks: instability, and what helps in it"],
    ["When to start therapy", "When to start therapy"],
    ["Can the relationship survive?", "Can the relationship survive?"],
    ["What the research says", "What the research says"],
    ["What therapy looks like, phase by phase", "What therapy looks like, phase by phase"],
    ["Disclosure: how much the betrayed partner should know", "Disclosure: how much the betrayed partner should know"],
    ["What the betrayed partner needs", "What the betrayed partner needs"],
    ["What the unfaithful partner must do", "What the unfaithful partner must do"],
    ["Particular situations", "Particular situations"],
    ["Five questions before you decide", "Five questions before you decide"],
    ["Formats", "Formats"],
    ["Frequently asked questions", "Frequently asked questions"],
  ],
  "how-many-sessions-couples-therapy": [
    ["Quick Answer", "Quick Answer"],
    ["What Research Actually Tells Us", "What Research Actually Tells Us"],
    ["What Determines Length for You?", "What Determines Length for You?"],
    ["How Often Should You Go?", "How Often Should You Go to Couples Therapy?"],
    ["What Happens in the First Session?", "What Happens in the First Session?"],
    ["When Do You Start Seeing Results?", "When Do You Start Seeing Results?"],
    ["What If Therapy Isn't Working?", "What If Couples Therapy Isn't Working?"],
    ["When Can You Stop?", "When Do You Know You Can Stop?"],
    ["What Does It Cost?", "What Does a Typical Course of Therapy Cost?"],
    ["Do You Have to Commit Upfront?", "Do You Have to Commit to 20 Sessions Upfront?"],
    ["FAQ: Sessions in Couples Therapy", "FAQ: Sessions in Couples Therapy"],
  ],
  "signs-couples-therapy-is-working": [
    ["Quick Answer: Does Couples Therapy Work?", "Quick Answer: Does Couples Therapy Work?"],
    ["10 Signs Couples Therapy Is Working", "10 Signs Couples Therapy Is Working"],
    ["What Does Progress Actually Mean?", "What Does Progress Actually Mean? — Before and After"],
    ["How Long Does It Take?", "How Long Does It Take for Couples Therapy to Work?"],
    ["Is Relief the Same as Progress?", "Is Relief the Same as Progress?"],
    ["Does Progress Mean Stopping Arguing?", "Does Progress Mean You Stop Arguing?"],
    ["In the Room vs. Between Sessions", "What Happens in the Therapy Room vs. Between Sessions"],
    ["How Can You Measure Progress?", "How Can You Measure Progress?"],
    ["What If Therapy Isn't Working?", "What If Couples Therapy Isn't Working?"],
    ["Can Therapy Work Even If You Separate?", "Can Couples Therapy Work Even If You Choose to Separate?"],
    ["When Should You Raise Something?", "When Should You Raise Something with Your Therapist?"],
    ["FAQ: Does Couples Therapy Work?", "FAQ: Does Couples Therapy Work?"],
  ],
  "couples-therapy-guide": [
    ["What couples therapy is, and three things it isn't", "What couples therapy is, and three things it isn't"],
    ["Who it's for", "Who it's for"],
    ["The four patterns nearly every couple falls into", "The four patterns nearly every couple falls into"],
    ["What happens in the first session", "What happens in the first session"],
    ["How long it takes", "How long it takes"],
    ["Methods, and what the evidence actually says", "Methods, and what the evidence actually says"],
    ["What it costs, and what insurance does", "What it costs, and what insurance does"],
    ["Online or in person", "Online or in person"],
    ["How to choose a therapist", "How to choose a therapist"],
    ["When couples therapy is the wrong first step", "When couples therapy is the wrong first step"],
    ["Frequently asked questions", "Frequently asked questions"],
  ],
  "emotionally-focused-therapy-explained": [
    ["The idea underneath it", "The idea underneath it"],
    ["One couple, three stages", "One couple, three stages"],
    ["What the therapist is actually doing", "What the therapist is actually doing"],
    ["What the research says", "What the research says"],
    ["Who EFT fits", "Who EFT fits"],
    ["Who it fits less well", "Who it fits less well"],
    ["EFT and the Gottman Method, briefly", "EFT and the Gottman Method, briefly"],
    ["What EFT looks like at Aether Practice", "What EFT looks like at Aether Practice"],
    ["Frequently asked questions", "Frequently asked questions"],
  ],
  "two-careers-one-relationship": [
    ["Quick Answer: Can Two Careers and One Relationship Actually Work?", "Quick Answer: Can Two Careers and One Relationship Actually Work?"],
    ["Why Dual-Career Couples Have Different Problems", "Why Dual-Career Couples Have Different Problems"],
    ["The Three Phases of a Dual-Career Relationship", "The Three Phases of a Dual-Career Relationship"],
    ["Seven Conflicts That Repeat in Dual-Career Couples", "Seven Conflicts That Repeat in Dual-Career Couples"],
    ["The Silent Ledger: Who Sacrificed More?", "The Silent Ledger: Who Sacrificed More?"],
    ["Competition: When Your Partner's Success Hurts", "Competition: When Your Partner's Success Hurts"],
    ["The Home Nobody Owns", "The Home Nobody Owns"],
    ["Self-Check: Where Do You Stand?", "Self-Check: Where Do You Stand?"],
    ["What Doesn't Help", "What Doesn't Help"],
    ["What Does Help: Seven Moves for Dual-Career Couples", "What Does Help: Seven Moves for Dual-Career Couples"],
    ["When You Need Outside Help", "When You Need Outside Help"],
    ["FAQ: Two Careers, One Relationship", "FAQ: Two Careers, One Relationship"],
    ["About Aether Practice", "About Aether Practice"],
    ["Take the Next Step", "Take the Next Step"],
    ["Research & Further Reading", "Research & Further Reading"],
  ],
  "when-your-partner-is-burned-out": [
    ["Quick Answer: What Does Burnout Do to a Relationship?", "Quick Answer: What Does Burnout Do to a Relationship?"],
    ["What Burnout Is, Briefly", "What Burnout Is, Briefly"],
    ["How It Shows Up at Home: 10 Signs", "How It Shows Up at Home: 10 Signs Burnout Has Taken the Relationship"],
    ["The Burned-Out Partner's Side", "The Burned-Out Partner's Side: Why Closeness Is So Hard"],
    ["The Partner's Side: The Invisible Burden", "The Partner's Side: The Invisible Burden"],
    ["The Pattern That Develops: Care, Resentment, Distance", "The Pattern That Develops: Care, Resentment, Distance"],
    ["Why High-Achieving Couples Are Especially Vulnerable", "Why High-Achieving Couples Are Especially Vulnerable"],
    ["Self-Check: Is This Us?", "Self-Check: Is This Us?"],
    ["What Doesn't Help", "What Doesn't Help"],
    ["What the Partner Can Do", "What the Partner Can Do"],
    ["What the Burned-Out Person Can Do", "What the Burned-Out Person Can Do"],
    ["Individual Treatment and Couples Therapy: Why Both?", "Individual Treatment and Couples Therapy: Why Both?"],
    ["FAQ: Burnout and Relationships", "FAQ: Burnout and Relationships"],
    ["About Aether Practice", "About Aether Practice"],
    ["Take the Next Step", "Take the Next Step"],
    ["Research & Further Reading", "Research & Further Reading"],
  ],
};

const englishLedeBySlug: Record<string, string> = {
  "couples-therapy-founders-executives":
    "Couples therapy for founders, executives, and people in high-pressure careers addresses a specific dynamic: you're trained to solve problems, perform under pressure, and hold it together. At home, none of that works. Your partner doesn't need solutions—they need your presence. This guide explains why careers so often take relationships, the seven patterns that repeat in couples with demanding jobs, and how couples therapy designed for this reality actually works.",
  "8-signs-need-couples-therapy":
    "Are you considering couples therapy because you have repeated conflicts, communication problems, or feel increasingly distant from each other? You do not have to wait until your relationship is on the verge of breaking down before seeking professional help. Here are 8 signs that you may need couples therapy, what they can mean for your relationship, and when it may be the right time to seek help.",
  "online-couples-therapy":
    "This guide explains what online couples therapy is, how it works in practice, and who it's right for — and why more and more couples are choosing to do this work over video rather than driving to a therapist's office.",
  "couples-communication-problems":
    "Communication problems in relationships can look like endless arguments, silence that stretches for days, criticism that never stops, or the feeling that no matter what you say, it never lands. For most couples, it's not about a lack of love — it's about patterns.",
  "how-many-sessions-couples-therapy":
    "There's no single right number. A shorter course might be 4–8 sessions. Couples with more entrenched patterns often need 12–20 or more. What determines length isn't a diagnosis — it's what you're actually working on, how long the problem has been going on, and how you both develop along the way.",
  "signs-couples-therapy-is-working":
    "Couples therapy appears to work when you gradually start handling conflicts differently — not necessarily less often, but differently. You recognize patterns a little earlier. Conflicts escalate more slowly. Repair attempts begin to land. The way back to connection gets shorter. Progress in couples therapy is rarely dramatic — it's most often quiet, cumulative, and felt as much between sessions as inside the therapy room.",
  "when-your-partner-is-burned-out":
    "Your partner is burned out and distant? Learn what burnout does to a relationship, the care–resentment–distance pattern that develops, what the partner and the burned-out person can each do, and when couples therapy helps alongside individual treatment.",
};

const faqBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "couples-therapy-founders-executives": [
    ["Why does work take the relationship?", "Because emotional presence requires surplus that a demanding job uses up, because the skills that make you effective at work are the opposite of what closeness requires, and because the relationship is the one thing in your life without deadlines. Nobody decides to deprioritize it. It happens anyway."],
    ["Is couples therapy for founders and executives different from standard couples therapy?", "Yes, in form and context. It's more direct and efficient, calibrated for time pressure and travel, and assumes the therapist understands what a demanding leadership role or founder's life does to a person and a relationship. The methods are the same evidence-based approaches, but the application is adapted."],
    ["My partner says I'm never present, but I'm home every evening. What do they mean?", "That you're physically present but emotionally elsewhere. You respond, but you're not listening. You fix, but you don't let anyone in. Presence isn't about hours in the house—it's about capacity to actually be with your partner in what they're experiencing."],
    ["How do we find time for couples therapy with demanding schedules?", "Choose a therapist with evening and online sessions. Also consider intensive formats—a weekend, for example—instead of weekly sessions you'll keep rescheduling. Aether Practice offers all three."],
    ["Can couples therapy help if we're co-founders or business partners?", "Yes, and it's often especially useful. Co-founder couples need help separating the roles, figuring out whose word is final in which context, and protecting the relationship from the company. Therapy creates a space to speak as partners rather than board members."],
    ["What if I genuinely don't have time to work less?", "Then it's not about working less—it's about being differently present in the time that exists. Ten minutes of real presence is worth more than an evening of physical attendance and mental absence. Therapy works on quality, not just quantity."],
    ["Is it confidential?", "Yes. Private couples therapy is billed directly, requires no referral, and doesn't go through an employer, an insurance provider, or any public record. Online sessions make it possible to meet without showing up in a waiting room."],
    ["What if I don't actually want to stop prioritizing my career?", "You don't have to. The goal isn't to make the career less important. The goal is to find a way to build the career without the relationship systematically getting what's left over."],
  ],
  "to-karrierer-ett-parforhold": [
    ["Kan et forhold fungere når begge har krevende karrierer?", "Ja, men det krever at dere bygger det aktivt. Karrierepar som lykkes, har snakket eksplisitt om hva de vil, tar store beslutninger sammen etter en avtalt prosess, og fordeler hjemmet som ansvar, ikke oppgaver. Par som lar det «ordne seg», ender ofte med at én karriere vinner uten at det ble bestemt."],
    ["Hvem sin karriere skal prioriteres når begge er viktige?", "Det finnes ikke ett riktig svar, men det finnes en riktig prosess: Bestem sammen, i fredstid, hvordan dere skal prioritere når det kolliderer. Noen par veksler. Noen velger én hovedkarriere for en periode, med en avtalt revurdering. Det viktige er at det er en beslutning, ikke en glidning."],
    ["Hvordan håndterer vi det at den ene tjener mer eller lykkes mer?", "Si det høyt. Ulik suksess skaper misunnelse, skyld og distanse hvis det ikke snakkes om. Anerkjenn hva den andre har bidratt med, inkludert det usynlige, og vær ærlig om hva ulikheten gjør med hver av dere."],
    ["Hvorfor krangler vi så mye om husarbeid når begge jobber fullt?", "Fordi husarbeid sjelden handler om husarbeid. Det handler om rettferdighet, om hvem sin tid som regnes som mest verdt, og om det usynlige arbeidet med å huske og planlegge, som oftest bæres skjevt. Fordel ansvar, ikke oppgaver, og snakk om det jevnlig."],
    ["Vi flyttet for min partners jobb, og jeg har aldri kommet meg igjen. Hva gjør vi?", "Si det til partneren, tydelig og uten anklage: hva det kostet, og hva du trenger nå. Mange partnere vet ikke hvor dypt det sitter. Dette er en av samtalene som ofte trenger en tredjepart, fordi skyld og bitterhet gjør den vanskelig å ha alene."],
    ["Når bør karrierepar søke parterapi?", "Når regnskapet har blitt bitterhet, når dere lever effektivt side om side uten nærhet, når beslutninger om fremtiden unngås, eller når misunnelse eller skyld har begynt å prege hvordan dere ser hverandre. Dere trenger ikke være i krise. Tidlig er bedre."],
  ],
  "two-careers-one-relationship": [
    ["Can a relationship work when both partners have demanding careers?", "Yes, but it requires actively building it. Dual-career couples who make it work have talked explicitly about what they want, make big decisions together through an agreed process, and divide the household by responsibility rather than task. Couples who let things 'sort themselves out' tend to end up with one career winning—without anyone having chosen that."],
    ["Whose career should take priority when both matter?", "There's no single right answer, but there is a right process: decide together, when nothing is on the table, how you'll prioritize when they collide. Some couples alternate. Some choose a primary career for a defined period, with a planned check-in. The important thing is that it's a decision—not a drift."],
    ["How do we handle it when one of us is more successful than the other?", "Say it out loud. Unequal success creates envy, guilt, and distance when it's left unspoken. Acknowledge what your partner has contributed—including the invisible parts—and be honest about what the imbalance does to each of you."],
    ["Why do we fight so much about housework when we both work full-time?", "Because housework is rarely about housework. It's about fairness, about whose time is worth more, and about the invisible labor of tracking and planning—which is usually distributed unevenly. Divide responsibility, not tasks. Revisit it regularly."],
    ["We relocated for my partner's job, and I've never recovered. What do we do?", "Tell your partner directly—what it cost and what you need now—without accusation. Many partners genuinely don't know how deep it runs. This is one of the conversations that often needs a third party, because guilt and resentment make it hard to have alone."],
    ["When should dual-career couples seek couples therapy?", "When the ledger has hardened into resentment, when you're living efficiently side by side without real closeness, when conversations about the future keep getting avoided, or when envy or guilt has started shaping how you see each other. You don't need to be in crisis. Earlier is better."],
  ],
  "parterapi-grundere-ledere": [
    ["Hvorfor tar jobben forholdet?", "Fordi følelsesmessig nærvær krever overskudd som en krevende jobb bruker opp, fordi ferdighetene som gjør deg god på jobb er det motsatte av det nærhet krever, og fordi forholdet er det eneste i livet som ikke har frister. Ingen velger å nedprioritere det. Det skjer likevel."],
    ["Er parterapi for ledere og gründere annerledes enn vanlig parterapi?", "Ja, i form og kontekst. Den er mer direkte og effektiv, tilpasset tidspress og reising, og forutsetter at terapeuten forstår hva krevende lederroller og gründerliv gjør med et menneske og et forhold. Metodene er de samme evidensbaserte, men anvendelsen er tilpasset."],
    ["Partneren min sier jeg aldri er til stede, men jeg er jo hjemme hver kveld. Hva mener hen?", "At du er fysisk til stede, men ikke følelsesmessig. Du svarer, men du lytter ikke. Du løser, men du slipper ikke inn. Nærvær handler ikke om timer i huset, men om kapasitet til å være med partneren i det hen opplever."],
    ["Hvordan finner vi tid til parterapi med krevende jobber?", "Velg en terapeut med kveldstimer og online-samtaler. Vurder også intensive formater, for eksempel en helg, i stedet for ukentlige timer dere uansett må flytte. Aether Practice tilbyr alle tre."],
    ["Kan parterapi hjelpe hvis vi driver selskap sammen?", "Ja, og det er ofte særlig nyttig. Medgründerpar trenger hjelp til å skille mellom rollene, finne ut hvem som har siste ord i hvilket rom, og beskytte forholdet fra bedriften. Terapien gir et rom der dere kan snakke som partnere, ikke som styremedlemmer."],
    ["Hva om jeg ikke har tid til å jobbe mindre?", "Da handler det ikke om å jobbe mindre, men om å være annerledes til stede i tiden som finnes. Ti minutter med reelt nærvær er verdt mer enn en kveld med fysisk tilstedeværelse og mentalt fravær. Terapien jobber med kvaliteten, ikke bare kvantiteten."],
    ["Er det diskret?", "Ja. Privat parterapi faktureres direkte, krever ingen henvisning, og går ikke gjennom fastlege, arbeidsgiver eller offentlige registre. Online-samtaler gjør det mulig å møtes uten å være sett på et venterom."],
    ["Hva hvis jeg egentlig ikke vil slutte å prioritere karrieren?", "Det trenger du ikke nødvendigvis. Målet er ikke å gjøre karrieren mindre viktig. Målet er å finne en måte å bygge karrieren på uten at forholdet systematisk får det som er igjen."],
  ],
  "couples-therapy-guide": [
    ["What is couples therapy?", "Structured work with a trained clinician in which both partners examine the pattern they're caught in, understand what drives it, and learn to reach each other differently. The relationship, not either individual, is the client. It's also called marriage counseling, couples counseling or relationship therapy; the terms are used interchangeably and don't indicate different methods."],
    ["Is marriage counseling different from couples therapy?", "No. \"Marriage counseling\" is the older term and still the more common search in parts of the US; \"couples therapy\" is the term most clinicians use because it doesn't assume marriage. The work is the same."],
    ["Does couples therapy actually work?", "For most couples, yes. Meta-analyses across decades show large improvements in relationship satisfaction, with gains holding at follow-up for a majority. Emotionally Focused Therapy has the strongest trial evidence, including two-year follow-up. Outcomes depend heavily on both partners being present and on the therapist holding both equally."],
    ["How long does couples therapy take?", "Typically 8–20 sessions, with most measurable change in the first eight to twelve. Prevention and transition work often finishes in 4–8. Infidelity recovery takes months. Intensive formats compress the early phase into two days plus follow-ups."],
    ["How much does couples therapy cost?", "US$150–450 per session in New York and California. A full course usually totals US$3,000–9,000. Two-day intensives run roughly US$2,500–7,500 as packages."],
    ["Does insurance cover couples therapy?", "Rarely as couples therapy. Where it does, it's billed as family psychotherapy with one partner carrying a mental-health diagnosis. Out-of-network benefits often reimburse 50–80% of an allowed amount after a deductible. US insurance rules and reimbursement vary by plan and provider."],
    ["What happens in the first session?", "How you met and the relationship at its best; what each of you sees as the problem; the last significant argument in detail; what you each hope for. Usually a short individual conversation with each partner. You leave with a sense of whether the therapist understood you both and a rough direction."],
    ["What's the best type of couples therapy?", "There isn't one. EFT has the strongest trial evidence and suits distance and withdrawal; the Gottman approach suits conflict-heavy couples who want structured tools; IBCT suits perpetual-difference conflicts. Differences between therapists matter more than differences between methods."],
    ["Can couples therapy be done online?", "Yes, with outcomes comparable to in-person in direct comparisons. It's a worse choice where there's intimidation or control at home, no private space, or a partner likely to disengage on a screen."],
    ["What if my partner won't go to couples therapy?", "Very common. Reframe the invitation from \"we need therapy\" to \"I want to understand us better and I want you with me.\" Offer one session, not a course. And start alone if you must: individual work focused on the relationship frequently shifts the dynamic enough that the other partner joins."],
    ["Is it too late for couples therapy?", "Rarely, if both partners are willing to be in the room. The signs that it may be: contempt rather than conflict, a partner who feels only relief at the thought of leaving, repeated betrayal without change, or a partner who has already decided. Even then, therapy can help you end well."],
  ],
  "couples-therapy-after-infidelity": [
    ["Can couples therapy help after infidelity?", "Yes. Couples who seek professional help after infidelity report improvement in relationship satisfaction, reduced distress and movement toward forgiveness at follow-up. Recovery is demanding and not linear, but therapy gives it structure: stabilising first, managing disclosure safely, and then rebuilding or deciding. Trust is rebuilt through action over months, and therapy keeps that process on track."],
    ["Should we start couples therapy right after an affair is discovered?", "Contact a therapist early; start couples work after the first few days. The acute shock phase (roughly 72 hours) is for individual support, sleep and no decisions. The window where couples therapy does the most is usually one to three weeks after disclosure, once both of you can speak and before the pattern hardens."],
    ["Can a relationship survive infidelity?", "Many do. Research following couples who stayed together finds meaningful healing is possible with sustained, mutual effort. The odds rise when the affair has ended completely, the unfaithful partner takes responsibility without minimising, and both partners are willing to examine what made the relationship vulnerable. They fall with ongoing contact, repeated infidelity, blame-shifting or one partner having already left emotionally."],
    ["How long does it take to recover from infidelity?", "Months, not sessions, with no universal timeline. Healing is non-linear with setbacks along the way, and trust is rebuilt through accumulated action over time rather than a single act of forgiveness. Couples who start therapy in the first weeks tend to move faster than those who wait."],
    ["Should the betrayed partner know all the details?", "Enough to understand, not everything. Facts prevent the imagination filling gaps with something worse; excessive detail, especially sexual detail, creates intrusive images that prolong recovery without helping. A structured, one-time disclosure prepared with the therapist and matched to what the betrayed partner has decided they want to know is the approach with the best outcomes."],
    ["What if I haven't decided whether to stay or go?", "That's normal and not a barrier to starting. You don't need the answer before therapy; one of therapy's jobs is to help you reach one you can live with, in either direction. If one of you is seriously unsure, the work shifts toward discernment counselling."],
    ["What if the affair is still going on?", "Recovery isn't possible while it continues, and no responsible therapist will begin couples work. Full and immediate end of contact is the precondition. Until then, individual therapy for either or both partners is the right step."],
    ["Is emotional infidelity as serious as physical?", "For the betrayed partner, often yes. Intense emotional intimacy with a third party, even without physical contact, can be experienced as a comparable betrayal and should be treated as seriously in therapy."],
    ["What if my partner won't go to therapy after cheating?", "Individual therapy for you can still help you process what happened and decide what you want. Reluctance sometimes shifts when the unfaithful partner sees the seriousness of the situation, or when the betrayed partner stops waiting and starts getting help alone."],
    ["Does online couples therapy work for infidelity?", "Yes. Video-delivered couples therapy has comparable outcomes to in-person in direct comparisons, and the discretion of not attending a clinic is something many couples value during this period. Structured disclosure and intensive formats both work online."],
    ["What does couples therapy after infidelity cost?", "US$150–450 per session in New York and California, with intensives priced as packages. A free 15-minute consultation comes first. Our cost guide covers insurance and reimbursement."],
  ],
  "emotionally-focused-therapy-explained": [
    ["What is Emotionally Focused Therapy?", "A couples therapy approach grounded in attachment science. It treats relationship distress as a negative cycle in which each partner's protective moves trigger the other's, and works in three stages: de-escalating the cycle, restructuring how partners reach each other, and consolidating the new pattern. It was developed by Sue Johnson and Les Greenberg in the 1980s and has the strongest clinical-trial evidence of any couples method."],
    ["How many sessions does EFT take?", "Typically 8–20 sessions. Stage 1 usually takes four to six, Stage 2 is the longest at six to ten, and Stage 3 is two to four. Intensive formats compress Stages 1 and 2 into two consecutive days with follow-ups."],
    ["What is the \"negative cycle\" in EFT?", "The repeating sequence of protective moves a couple falls into regardless of topic: most often one partner pursuing (criticising, pressing) and the other withdrawing (going quiet, leaving), each move triggering the other's. EFT's first stage is making this cycle visible so the couple can see it as a shared problem rather than as something one partner does to the other."],
    ["What is a softening event?", "The moment in Stage 2 when the pursuing partner drops the protest and asks directly for what they need, and the re-engaged withdrawing partner is able to respond. In EFT research it's the change event most strongly linked to lasting improvement. From outside it's quiet; from inside, couples describe it as the first time in years they've reached each other."],
    ["Does EFT work?", "Yes, with the best evidence of any couples method. A 2024 meta-analysis found large, consistent effects on satisfaction and attachment; early trials reported roughly 70–75% of couples moving from distressed to non-distressed; and two-year follow-up shows gains hold and sometimes continue to grow after therapy ends."],
    ["Is EFT better than the Gottman Method?", "It has stronger clinical-trial evidence, but the two serve somewhat different couples. EFT suits distance, withdrawal and attachment injuries; Gottman-based work suits conflict-heavy couples who want structured tools. Most experienced therapists draw on both. Choose by your problem and your therapist, not by brand."],
    ["Does EFT involve homework?", "Very little. Change is designed to happen in session, where the therapist can hold both partners through difficult moments, and then to be practised at home because it's been experienced rather than assigned. Couples who want structured exercises between sessions may prefer a different approach."],
    ["Can EFT be done online?", "Yes. Video-delivered EFT has been compared directly with in-person EFT with comparable outcomes on satisfaction and attachment measures. The method's moment-by-moment tracking of both partners translates well to a format where both faces are visible at once."],
    ["Can EFT help after an affair?", "Yes. EFT has a specific model for repairing attachment injuries, including infidelity, and research shows couples who complete the injury-resolution process have better outcomes than those who don't. It's used alongside stabilisation and disclosure work."],
  ],
  "parterapi-etter-utroskap": [
    ["Kan parterapi hjelpe etter utroskap?", "Ja. Par som søker profesjonell hjelp etter utroskap rapporterer forbedringer i forholdstilfredsstillelse, redusert plage og bevegelse mot tilgivelse ved oppfølging. Recovery er krevende og ikke lineær, men terapi gir den struktur: stabilisering først, håndtering av avsløring på en trygg måte, og deretter gjenoppbygging eller avgjørelse."],
    ["Bør vi begynne i parterapi rett etter at utroskapen er avslørt?", "Ta kontakt tidlig — begynn selve pararbeidet etter de første dagene. Akuttsjokket er for individuell støtte, søvn og ingen avgjørelser. Vinduet der parterapi gjør mest er vanligvis én til tre uker etter avsløringen."],
    ["Kan forholdet overleve utroskap?", "Mange gjør det. Forskning finner at meningsfull helbredelse er mulig med vedvarende, gjensidig innsats. Sjansene stiger når utroskapen er avsluttet fullstendig, den utro partneren tar ansvar uten å bagatellisere, og begge er villige til å undersøke hva som gjorde forholdet sårbart."],
    ["Hvor lang tid tar recovery?", "Måneder, ikke sesjoner — uten universell tidslinje. Helbredelse er ikke lineær, med tilbakeslag underveis, og tillit gjenoppbygges gjennom akkumulert handling over tid fremfor én tilgivelseshandling."],
    ["Bør den sveikede få vite alle detaljer?", "Nok til å forstå — ikke alt. En strukturert, engangsavsløring forberedt med terapeuten og tilpasset hva den sveikede har besluttet at de vil vite, er tilnærmingen med best resultater."],
    ["Hva hvis jeg ikke har bestemt meg for om jeg vil bli eller gå?", "Det er normalt og ikke en hindring for å starte. Dere trenger ikke svaret før terapi; en av terapiens oppgaver er å hjelpe dere til å nå ett dere kan leve med — uansett retning."],
    ["Hva hvis utroskapen pågår fortsatt?", "Recovery er ikke mulig mens den pågår, og ingen ansvarlig terapeut vil starte pararbeid. Full og umiddelbar avslutning av kontakten er forutsetningen. Inntil da er individuell terapi for en eller begge det riktige steget."],
    ["Er emosjonell utroskap like alvorlig som seksuell?", "For den sveikede — ofte ja. Intens emosjonell intimitet med en tredjeperson, selv uten fysisk kontakt, kan oppleves som et tilsvarende svik og bør tas like alvorlig i terapi."],
    ["Hva hvis partneren min ikke vil i terapi?", "Individuell terapi for deg kan likevel hjelpe deg å bearbeide det som skjedde og bestemme hva du ønsker. Motvilje endrer seg noen ganger når den utro partneren ser alvoret i situasjonen."],
    ["Virker online parterapi etter utroskap?", "Ja. Videobasert parterapi har sammenlignbare resultater med oppmøteterapi i direkte sammenligninger, og diskresjonen ved å slippe å oppsøke en klinikk er noe mange par setter pris på i denne perioden."],
    ["Hva koster parterapi etter utroskap?", "1 700 NOK per 60-minutters sesjon, med intensiver priset som pakker. En gratis 15-minutters innledende samtale kommer alltid først."],
  ],
  "parterapi-i-oslo": [
    ["Vi argumenterer ikke så mye. Trenger vi parterapi?", "Ja, muligens. Fraværet av argumenter betyr ikke nødvendigvis at forholdet er sunt. Noen par har svært lite konflikt, men mye følelsesmessig avstand eller nummenhet. Hvis du merker at noe har endret seg eller at intimitet mangler, er det verdt å utforske med en terapeut."],
    ["Hva hvis bare jeg vil til terapi?", "Det er mulig å starte med å søke hjelp selv om bare én partner er motivert. En terapeut kan hjelpe med å forstå denne asymmetrien og utforske hvordan begge kan engasjere seg."],
    ["Kan parterapi hjelpe etter utroskap?", "Ja. Parterapi etter utroskap kan gi paret et strukturert rom for å forstå hva som har skjedd, håndtere reaksjoner og arbeide med tillit og kommunikasjon. For noen par handler prosessen om å reparere forholdet; for andre handler den om å finne ut hva som skal til for å gå videre sammen eller hver for seg."],
    ["Kan parterapi hjelpe hvis jeg vurderer skilsmisse?", "Ja. Parterapi kan hjelpe dere med å utforske hva dere ønsker, forstå mønstrene i forholdet og få et tydeligere grunnlag for å ta stilling til veien videre. For noen par handler det om å forsøke å gjenoppbygge forholdet; for andre kan prosessen bidra til å avklare om de ønsker å gå videre sammen eller hver for seg."],
    ["Når er parterapi ikke riktig hjelp?", "Parterapi forutsetter at begge partnerne kan delta frivillig og på en trygg måte. Ved vold, trusler eller overgrep i forholdet er parterapi ikke riktig første steg. Da bør sikkerhet og individuell hjelp komme først."],
  ],
  "nar-partneren-er-utbrent": [
    ["Hvordan påvirker utbrenthet parforholdet?", "Utbrenthet tapper den som rammes for kapasitet til nærhet, og hen blir fjern, irritabel eller nummen. Partneren tar over mer, demper egne behov og kjenner seg alene. Over tid oppstår et mønster av omsorg, bitterhet og avstand som rammer begge, og som kan vare lenger enn selve utbrentheten."],
    ["Partneren min er utbrent og avviser meg. Hva gjør jeg?", "Skill mellom personen og tilstanden: avvisningen er mangel på kapasitet og skam, ikke manglende kjærlighet. Tilby nærvær i stedet for løsninger, si rolig hva du selv bærer, og ta vare på deg selv. Oppmuntre partneren til å få hjelp, og vurder parterapi for å unngå at avstanden setter seg."],
    ["Er det normalt å bli sint på en partner som er utbrent?", "Ja. Du bærer mer, får mindre og lever med en person som ikke er tilgjengelig. Sinne er en naturlig reaksjon, og skammen over det gjør det bare tyngre. Si det høyt, rolig og uten anklage, i stedet for å la det bygge seg opp."],
    ["Kan parterapi hjelpe ved utbrenthet?", "Ja, som supplement til individuell behandling. Parterapi hjelper dere å bryte mønsteret av omsorg, bitterhet og avstand, gir begge et sted å si det usagte, og forhindrer at utbrentheten blir forholdets form på lang sikt. Den utbrente bør samtidig få hjelp individuelt, med fastlege som første stopp."],
    ["Hvor lenge varer utbrenthet?", "Det varierer mye, fra noen måneder til flere år, avhengig av alvorlighetsgrad, årsak og hvilke endringer som gjøres. Forholdet kan ikke settes på vent så lenge, og det er derfor det er viktig å ivareta det underveis."],
    ["Hva om jeg selv begynner å bli utbrent av å bære partneren?", "Det er vanlig, og det er et varsel. Partnere til utbrente trenger egen støtte: venner, egen tid, og ofte noen å snakke med. Hvis dere begge går tomme, er det ingen igjen til å holde tråden. Søk hjelp før det skjer."],
    ["Bør jeg bli hos en partner som er utbrent?", "Utbrenthet er en tilstand, ikke en person, og de fleste blir bedre med riktig hjelp. Men du har også rett til egne grenser. Hvis forholdet var vanskelig før utbrentheten, eller hvis partneren avviser all hjelp over lang tid, er det verdt å ta på alvor."],
  ],
  "when-your-partner-is-burned-out": [
    ["How does burnout affect a relationship?", "Burnout drains the person it hits of the capacity closeness requires, making them distant, irritable, or numb. The partner takes over more, suppresses their own needs, and feels alone. Over time a pattern of care, resentment, and distance develops that affects both people — and can last longer than the burnout itself."],
    ["My partner is burned out and rejecting me. What do I do?", "Separate the person from the state: the rejection is a lack of capacity and shame, not a lack of love. Offer presence instead of solutions, calmly say what you're carrying yourself, and take care of your own needs. Encourage your partner to get help, and consider couples therapy to keep the distance from hardening."],
    ["Is it normal to be angry at a partner who is burned out?", "Yes. You're carrying more, getting less, and living with someone who isn't available. Anger is a natural response, and the shame about it only makes it heavier. Say it out loud — calmly, without accusation — instead of letting it build."],
    ["Can couples therapy help with burnout?", "Yes, as a supplement to individual treatment. Couples therapy helps you break the care–resentment–distance pattern, gives both partners somewhere to say the unsaid, and keeps the burnout from becoming the relationship's permanent shape. The burned-out person should be getting individual help at the same time, starting with a doctor."],
    ["How long does burnout last?", "It varies considerably — from a few months to several years — depending on severity, cause, and what changes are made. The relationship can't be put on hold that long, which is why it needs attention throughout."],
    ["What if I'm starting to burn out from carrying my partner?", "This is common, and it's a warning sign. Partners of burned-out people need their own support: friends, time for themselves, often someone to talk to. If you both run empty, there's no one left to hold the thread. Get help before that happens."],
    ["Should I stay with a partner who is burned out?", "Burnout is a state, not a person, and most people recover with the right help. But you also have the right to your own limits. If the relationship was struggling before the burnout, or if your partner refuses help over a sustained period, that's worth taking seriously."],
  ],
};

const norwegianTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "parterapi-grundere-ledere": [
    ["Kort svar: Hvorfor tar jobben forholdet?", "Kort svar: Hvorfor tar jobben forholdet?"],
    ["Slik ser det ut: Fem setninger vi hører ofte", "Slik ser det ut: Fem setninger vi hører ofte"],
    ["Hvorfor vanlig relasjonsråd ikke treffer", "Hvorfor vanlig relasjonsråd ikke treffer"],
    ["Sju mønstre hos par med krevende karrierer", "Sju mønstre hos par med krevende karrierer"],
    ["Gründerparet: Når bedriften er den tredje i forholdet", "Gründerparet: Når bedriften er den tredje i forholdet"],
    ["Lederparet: Når den ene bærer et ansvar den andre ikke ser", "Lederparet: Når den ene bærer et ansvar den andre ikke ser"],
    ["Asymmetrien: Når den ene er «på» og den andre bærer resten", "Asymmetrien: Når den ene er «på» og den andre bærer resten"],
    ["Selvsjekk: Har jobben tatt forholdet?", "Selvsjekk: Har jobben tatt forholdet?"],
    ["Hva som ikke hjelper", "Hva som ikke hjelper"],
    ["Hva som hjelper: Seks grep for par med krevende jobber", "Hva som hjelper: Seks grep for par med krevende jobber"],
    ["Hvordan parterapi for ledere og gründere skiller seg fra vanlig parterapi", "Hvordan parterapi for ledere og gründere skiller seg fra vanlig parterapi"],
    ["FAQ: Parterapi for ledere og gründere", "FAQ: Parterapi for ledere og gründere"],
    ["Om Aether Practice", "Om Aether Practice"],
    ["Ta neste steg", "Ta neste steg"],
    ["Forskning og videre lesning", "Forskning og videre lesning"],
  ],
  "to-karrierer-ett-parforhold": [
    ["Kort svar: Kan to karrierer og ett forhold fungere?", "Kort svar: Kan to karrierer og ett forhold fungere?"],
    ["Hvorfor karrierepar har andre problemer enn andre par", "Hvorfor karrierepar har andre problemer enn andre par"],
    ["De tre fasene i et karriereparforhold", "De tre fasene i et karriereparforhold"],
    ["Sju konflikter som går igjen hos karrierepar", "Sju konflikter som går igjen hos karrierepar"],
    ["Det stille regnskapet: Hvem ofret mest?", "Det stille regnskapet: Hvem ofret mest?"],
    ["Konkurranse: Når partnerens suksess gjør vondt", "Konkurranse: Når partnerens suksess gjør vondt"],
    ["Hjemmet som ingen eier", "Hjemmet som ingen eier"],
    ["Selvsjekk: Hvor står dere?", "Selvsjekk: Hvor står dere?"],
    ["Hva som ikke hjelper", "Hva som ikke hjelper"],
    ["Hva som hjelper: Sju grep for karrierepar", "Hva som hjelper: Sju grep for karrierepar"],
    ["Når dere trenger hjelp utenfra", "Når dere trenger hjelp utenfra"],
    ["FAQ: To karrierer, ett parforhold", "FAQ: To karrierer, ett parforhold"],
    ["Om Aether Practice", "Om Aether Practice"],
    ["Ta neste steg", "Ta neste steg"],
    ["Forskning og videre lesning", "Forskning og videre lesning"],
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
  "parterapi-etter-utroskap": [
    ["De første 72 timene: ikke ta noen avgjørelser", "De første 72 timene: ikke ta noen avgjørelser"],
    ["De første ukene: ustabilitet, og hva som hjelper", "De første ukene: ustabilitet, og hva som hjelper"],
    ["Når bør dere begynne i terapi?", "Når bør dere begynne i terapi?"],
    ["Kan forholdet overleve?", "Kan forholdet overleve?"],
    ["Hva forskning sier", "Hva forskning sier"],
    ["Hva terapi ser ut som, fase for fase", "Hva terapi ser ut som, fase for fase"],
    ["Avsløring: hvor mye den sveikede bør vite", "Avsløring: hvor mye den sveikede bør vite"],
    ["Hva den sveikede trenger", "Hva den sveikede trenger"],
    ["Hva den utro partneren må gjøre", "Hva den utro partneren må gjøre"],
    ["Særlige situasjoner", "Særlige situasjoner"],
    ["Fem spørsmål før dere bestemmer dere", "Fem spørsmål før dere bestemmer dere"],
    ["Format", "Format"],
    ["Ofte stilte spørsmål", "Ofte stilte spørsmål"],
  ],
  "hvor-mange-sesjoner-parterapi": [
    ["Kort svar", "Kort svar"],
    ["Hva Forskning Faktisk Kan Fortelle Oss", "Hva Forskning Faktisk Kan Fortelle Oss"],
    ["Hva Avgjør Lengden for Akkurat Dere?", "Hva Avgjør Lengden for Akkurat Dere?"],
    ["Hvor Ofte Bør Man Gå?", "Hvor Ofte Bør Man Gå i Parterapi?"],
    ["Hva Skjer i Første Time?", "Hva Skjer i Første Time?"],
    ["Når Merker Man Effekt?", "Når Merker Man Effekt av Parterapi?"],
    ["Hva Hvis Det Ikke Fungerer?", "Hva Hvis Parterapi Ikke Fungerer?"],
    ["Når Kan Man Avslutte?", "Når Vet Man at Man Kan Avslutte Parterapi?"],
    ["Hva Koster et Vanlig Forløp?", "Hvor Mye Koster et Vanlig Forløp?"],
    ["Må Vi Bestemme Oss med en Gang?", "Må Vi Bestemme Oss for 20 Timer med en Gang?"],
    ["FAQ: Sesjoner i Parterapi", "FAQ: Sesjoner i Parterapi"],
  ],
  "tegn-pa-at-parterapi-virker": [
    ["Kort Svar: Virker Parterapi?", "Kort Svar: Virker Parterapi?"],
    ["10 Tegn på at Parterapi Virker", "10 Tegn på at Parterapi Virker"],
    ["Hva Betyr Fremgang Egentlig?", "Hva Betyr Fremgang Egentlig? — Før og Etter"],
    ["Hvor Lang Tid Tar Det?", "Hvor Lang Tid Tar Det Før Parterapi Virker?"],
    ["Er Lettelse Det Samme Som Fremgang?", "Er Lettelse Det Samme Som Fremgang?"],
    ["Betyr Fremgang at Dere Slutter å Krangle?", "Betyr Fremgang at Dere Slutter å Krangle?"],
    ["Terapirommet vs. Mellom Timene", "Hva Skjer i Terapirommet vs. Mellom Timene"],
    ["Hvordan Kan Dere Måle Fremgang?", "Hvordan Kan Dere Måle Fremgang?"],
    ["Hva Hvis Parterapi Ikke Virker?", "Hva Hvis Parterapi Ikke Virker?"],
    ["Kan Parterapi Virke Selv Om Dere Går Fra Hverandre?", "Kan Parterapi Virke Selv Om Dere Velger å Gå Fra Hverandre?"],
    ["Når Bør Dere Ta Opp Noe?", "Når Bør Dere Ta Opp Noe Med Terapeuten?"],
    ["FAQ: Virker Parterapi?", "FAQ: Virker Parterapi?"],
  ],
  "nar-partneren-er-utbrent": [
    ["Kort svar: Hva gjør utbrenthet med parforholdet?", "Kort svar: Hva gjør utbrenthet med parforholdet?"],
    ["Hva utbrenthet er, kort forklart", "Hva utbrenthet er, kort forklart"],
    ["Slik merkes det hjemme: 10 tegn", "Slik merkes det hjemme: 10 tegn på at utbrenthet har tatt forholdet"],
    ["Den utbrentes side", "Den utbrentes side: Hvorfor det er så vanskelig å være nær"],
    ["Partnerens side: Den usynlige belastningen", "Partnerens side: Den usynlige belastningen"],
    ["Mønsteret som oppstår: Omsorg, bitterhet, avstand", "Mønsteret som oppstår: Omsorg, bitterhet, avstand"],
    ["Hvorfor høytpresterende par er særlig utsatt", "Hvorfor høytpresterende par er særlig utsatt"],
    ["Selvsjekk: Er dette oss?", "Selvsjekk: Er dette oss?"],
    ["Hva som ikke hjelper", "Hva som ikke hjelper"],
    ["Hva partneren kan gjøre", "Hva partneren kan gjøre"],
    ["Hva den utbrente kan gjøre", "Hva den utbrente kan gjøre"],
    ["Individuell behandling og parterapi: Hvorfor begge deler?", "Individuell behandling og parterapi: Hvorfor begge deler?"],
    ["FAQ: Utbrenthet og parforhold", "FAQ: Utbrenthet og parforhold"],
    ["Om Aether Practice", "Om Aether Practice"],
    ["Ta neste steg", "Ta neste steg"],
    ["Forskning og videre lesning", "Forskning og videre lesning"],
  ],
};

const norwegianLedeBySlug: Record<string, React.ReactNode> = {
  "parterapi-grundere-ledere": "Parterapi for ledere og gründere handler om en bestemt dynamikk: Du er vant til å løse problemer, prestere under press og holde fasaden. Hjemme fungerer ikke noe av det. Partneren din trenger ikke løsninger, men nærvær. Du har ikke noe igjen å gi etter en dag der alle trengte noe av deg. Og forholdet, det eneste i livet ditt som ikke sender purringer, blir det som vike.",
  "parterapi-pris-oslo": "Denne guiden gir deg en ærlig og oppdatert oversikt over hva parterapi koster i Oslo — hva som påvirker prisen, hvilke gratis alternativer som finnes, og hvordan du velger riktig tilbud for dere som par.",
  "parterapi-pa-nett": "Denne guiden forklarer hva parterapi på nett er, hvordan det fungerer i praksis, hvem det passer for — og hvorfor stadig flere norske par velger å jobbe med forholdet via videosamtale fremfor å møte opp fysisk hos en terapeut.",
  "kommunikasjonsproblemer-i-parforhold": "Kommunikasjonsproblemer i parforhold kan se ut som endeløse krangler, taushet som varer i dager, kritikk som aldri stopper, eller følelsen av at uansett hva du sier så når det ikke frem. For de fleste par handler det ikke om mangel på kjærlighet — det handler om mønstre.",
  "hvor-mange-sesjoner-parterapi": "Det finnes ikke ett riktig antall. Et kortere forløp kan bestå av 4–8 sesjoner. Par med mer fastlåste mønstre trenger ofte 12–20 eller mer. Hva som avgjør lengden er ikke diagnosen — det er hva dere faktisk jobber med, hvor lenge problemet har vart, og hvordan dere utvikler dere underveis.",
  "tegn-pa-at-parterapi-virker": "Parterapi ser ut til å virke når dere gradvis begynner å håndtere konflikter annerledes — ikke nødvendigvis sjeldnere, men annerledes. Dere gjenkjenner mønstrene litt tidligere. Konflikter eskalerer saktere. Reparasjonsforsøk begynner å lande. Veien tilbake til kontakt blir kortere. Fremgang i parterapi er sjelden dramatisk — den er oftest stille, kumulativ, og merkes like mye mellom timene som inne i terapirommet.",
  "nar-friluftsliv-blir-viktigere-enn-forholdet": "Friluftsliv kan være en sterk kilde til nærhet i et parforhold. Men hva skjer når aktiviteter blir viktigere enn kontakten hjemme? For mange par er turer, ski, hytta, trening og andre friluftsaktiviteter en viktig del av livet sammen. Det kan gi glede, mestring, opplevelser og tid sammen. Men noen ganger kan det også oppstå et mønster der aktivitetene blir stedet dere fortsatt fungerer godt sammen – mens nærheten, samtalene og intimiteten hjemme gradvis forsvinner.",
  "parterapi-i-oslo-tegn": "Vurderer dere parterapi fordi dere har gjentatte konflikter, kommunikasjonsproblemer eller økende avstand i forholdet? Dere trenger ikke å vente til dere står på randen av et samlivsbrudd før dere søker profesjonell hjelp. Her er 8 tegn på at dere trenger parterapi, hva de kan bety for parforholdet, og når det kan være riktig å søke hjelp.",
  "parterapi-i-oslo": (
    <>
      Denne guiden til parterapi i Oslo forklarer når parterapi kan være nyttig, hvilke terapiformer som finnes, og
      hvordan dere velger riktig parterapeut. Du får også vite hva dere kan forvente av parterapi, hva det koster i
      Oslo, og når det kan være riktig å søke hjelp.
    </>
  ),
  "nar-partneren-er-utbrent":
    "Når én i et parforhold blir utbrent, rammes begge. Den utbrente har ikke overskudd til nærhet, blir irritabel eller fjern, og trekker seg fra det som før ga glede. Partneren tar over mer, kjenner seg alene, og vet ikke om hen skal støtte eller stille krav. Over tid kan utbrentheten bli et mønster i forholdet, ikke bare en tilstand hos den ene. Denne guiden forklarer hva utbrenthet gjør med et parforhold, hva partneren kan gjøre, og når parterapi er riktig hjelp ved siden av individuell behandling.",
};

function headingId(children: React.ReactNode) {
  return typeof children === "string"
    ? children.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
}

function formatDate(date: string, lang: LanguageCode) {
  const localeMap: Record<LanguageCode, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date).toLocaleDateString(localeMap[lang], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element -- MDX images have no known dimensions
    <img loading="lazy" decoding="async" className="mt-8 h-auto w-full rounded-2xl" {...props} />
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

/** Full article page body. The route decides which post to load; this renders it. */
export function BlogPost({ post, related }: { post: BlogPostData; related: BlogPostMeta[] }) {
  const schemaLangByLang: Record<LanguageCode, string> = { en: "en-US", no: "nb-NO" };
  const languageLinks = getTranslationsForPost(post).map((t) => ({
    code: t.lang,
    href: postPath(t),
  }));
  const canonicalUrl = `https://aetherpractice.com${postPath(post)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: canonicalUrl,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    inLanguage: schemaLangByLang[post.lang],
    isAccessibleForFree: true,
    wordCount: post.wordCount,
    ...(post.image ? { image: `https://aetherpractice.com${post.image}` } : {}),
    ...(post.tags.length ? { articleSection: post.tags[0] } : {}),
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
      "@id": canonicalUrl,
    },
  };

  const faqItems: ReadonlyArray<readonly [string, string]> =
    faqBySlug[post.slug] ?? extractFaq(post).map((item) => [item.question, item.answer] as const);
  const faqJsonLd = faqItems.length
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

  const blogIndexPath = localizedPaths.blog[post.lang];
  const blogIndexLabel = post.lang === "no" ? "Blogg" : "Blog";

  const breadcrumbLd = breadcrumbJsonLd([
    { name: post.lang === "no" ? "Hjem" : "Home", path: localizedPaths.home[post.lang] },
    { name: blogIndexLabel, path: blogIndexPath },
    { name: post.title, path: postPath(post) },
  ]);

  return (
    <BlogShell language={post.lang} languageLinks={languageLinks}>
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
      <BlogViewTracker path={postPath(post)} title={post.title} />
      <article lang={htmlLangFor(post.lang)} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
        <Link
          href={blogIndexPath}
          className="font-[Roboto,Arial,sans-serif] text-sm text-zinc-500 hover:text-zinc-900"
        >
          {backToBlogLabel[post.lang]}
        </Link>
        <div className="mt-6 flex items-center gap-2 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(post.wordCount, post.lang)}</span>
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

        {post.lang === "en" && post.slug === "8-signs-need-couples-therapy" && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Many couples notice the problems long before they become a crisis. The same conflicts can repeat themselves, communication can become more difficult, and closeness can gradually fade.</p>
            <p>Often it&apos;s not about one big event, but about patterns that develop over time. One person withdraws while the other tries harder and harder to reconnect. Both can end up feeling misunderstood.</p>
            <p>The earlier you recognize these patterns, the easier it can be to address them.</p>
          </div>
        )}

        <div className="mt-4">
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}

        <RelatedPosts posts={related} language={post.lang} />
      </article>
    </BlogShell>
  );
}
