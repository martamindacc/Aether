import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
  const enTranslation = translations.find((t) => t.lang === "en");
  const languages =
    translations.length > 1
      ? {
          ...Object.fromEntries(translations.map((t) => [t.lang, `/blog/${t.slug}`])),
          ...(enTranslation ? { "x-default": `/blog/${enTranslation.slug}` } : {}),
        }
      : { [post.lang]: `/blog/${post.slug}` };

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
};

const englishLedeBySlug: Record<string, string> = {
  "couples-therapy-founders-executives":
    "Couples therapy for founders, CEOs, executives, and entrepreneurs helps address relationship problems caused by startup stress, long hours, leadership pressure, financial uncertainty, and work-life imbalance. This guide explains how executive relationship stress affects a partnership, when therapy can help, and how high-achieving couples can protect their connection while building a demanding career.",
  "8-signs-need-couples-therapy":
    "Are you considering couples therapy because you have repeated conflicts, communication problems, or feel increasingly distant from each other? You do not have to wait until your relationship is on the verge of breaking down before seeking professional help. Here are 8 signs that you may need couples therapy, what they can mean for your relationship, and when it may be the right time to seek help.",
  "online-couples-therapy":
    "This guide explains what online couples therapy is, how it works in practice, and who it's right for — and why more and more couples are choosing to do this work over video rather than driving to a therapist's office.",
  "couples-communication-problems":
    "Communication problems in relationships can look like endless arguments, silence that stretches for days, criticism that never stops, or the feeling that no matter what you say, it never lands. For most couples, it's not about a lack of love — it's about patterns.",
  "couples-therapy-after-infidelity":
    "Most relationships can survive infidelity, and a meaningful share of couples who do the work describe themselves as closer afterwards than before. But recovery is not linear, measured in months rather than sessions, and depends on conditions that must be in place before couples therapy can help.",
  "how-many-sessions-couples-therapy":
    "There's no single right number. A shorter course might be 4–8 sessions. Couples with more entrenched patterns often need 12–20 or more. What determines length isn't a diagnosis — it's what you're actually working on, how long the problem has been going on, and how you both develop along the way.",
  "signs-couples-therapy-is-working":
    "Couples therapy appears to work when you gradually start handling conflicts differently — not necessarily less often, but differently. You recognize patterns a little earlier. Conflicts escalate more slowly. Repair attempts begin to land. The way back to connection gets shorter. Progress in couples therapy is rarely dramatic — it's most often quiet, cumulative, and felt as much between sessions as inside the therapy room.",
  "couples-therapy-guide":
    "Couples therapy (also called marriage counseling, couples counseling or relationship therapy) is structured work with a trained clinician in which both partners examine the pattern they are caught in, understand what drives it, and learn to reach each other differently. The best-evidenced approaches are Emotionally Focused Therapy and behavioural methods; most couples see meaningful change in 8–20 sessions; private fees run roughly US$150–450 per session in New York and California; and the strongest predictor of success is not the method but whether both partners feel equally held by the therapist.",
  "emotionally-focused-therapy-explained":
    "Emotionally Focused Therapy is a couples therapy approach built on attachment science. It treats relationship distress as a negative cycle in which each partner's protective moves trigger the other's, and works in three stages: de-escalating the cycle, restructuring how partners reach each other, and consolidating the new pattern. EFT has the strongest clinical-trial evidence of any couples method, including a 2024 meta-analysis and two-year follow-up data, and roughly 70–75% of couples in early trials moved from distressed to non-distressed.",
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
  "parterapi-etter-utroskap": [
    ["De Første 24–72 Timene", "De Første 24–72 Timene"],
    ["De Første Ukene", "De Første Ukene"],
    ["Kan Forholdet Overleve Utroskap?", "Kan Forholdet Overleve Utroskap?"],
    ["Hva Forskning Sier Om Recovery", "Hva Forskning Sier Om Recovery"],
    ["Er Parterapi Riktig Nå?", "Er Parterapi Riktig Nå — Eller For Tidlig?"],
    ["Hva Skjer i Parterapi — Sesjon for Sesjon", "Hva Skjer i Parterapi Etter Utroskap — Sesjon for Sesjon"],
    ["Hva Den Sveikede Trenger", "Hva Den Sveikede Trenger"],
    ["Hva Den Utro Partneren Må Gjøre", "Hva Den Utro Partneren Må Gjøre"],
    ["Bør Alle Detaljer Avsløres?", "Bør Alle Detaljer Avsløres?"],
    ["Spesielle Situasjoner", "Spesielle Situasjoner"],
    ["Fem Spørsmål Før Dere Bestemmer Dere", "Fem Spørsmål Før Dere Bestemmer Dere"],
    ["Tegn på At Forholdet Kan Repareres", "Tegn på At Forholdet Kan Repareres"],
    ["Når Bør Dere Søke Hjelp?", "Når Bør Dere Søke Hjelp?"],
    ["FAQ: Parterapi Etter Utroskap", "FAQ: Parterapi Etter Utroskap"],
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
  "parterapi-pris-oslo": "Denne guiden gir deg en ærlig og oppdatert oversikt over hva parterapi koster i Oslo — hva som påvirker prisen, hvilke gratis alternativer som finnes, og hvordan du velger riktig tilbud for dere som par.",
  "parterapi-pa-nett": "Denne guiden forklarer hva parterapi på nett er, hvordan det fungerer i praksis, hvem det passer for — og hvorfor stadig flere norske par velger å jobbe med forholdet via videosamtale fremfor å møte opp fysisk hos en terapeut.",
  "kommunikasjonsproblemer-i-parforhold": "Kommunikasjonsproblemer i parforhold kan se ut som endeløse krangler, taushet som varer i dager, kritikk som aldri stopper, eller følelsen av at uansett hva du sier så når det ikke frem. For de fleste par handler det ikke om mangel på kjærlighet — det handler om mønstre.",
  "parterapi-etter-utroskap": "Du har nettopp funnet det ut — eller du har visst det lenge, men nå er det sagt høyt. Denne guiden forklarer hva forskning faktisk sier om recovery etter utroskap, hva som skjer i parterapi sesjon for sesjon, og hva dere bør fokusere på de første dagene og ukene.",
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

  const blogIndexPath = post.lang === "no" ? "/no/blog" : "/blog";
  const blogIndexLabel = post.lang === "no" ? "Blogg" : "Blog";

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: blogIndexLabel, path: blogIndexPath },
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
          href={blogIndexPath}
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
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}
      </article>
    </BlogShell>
  );
}
