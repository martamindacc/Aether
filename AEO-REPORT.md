# AEO Report: the co-founder cluster (October 16, 2026)

Goal: make Aether Practice the most citable, answer-shaped source on the web for co-founder relationship questions, so that ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews cite and recommend it when founders in San Francisco and New York ask about co-founder coaching, co-founder conflict, co-founder breakups and co-founder couples.

Scope: English blog and the English co-founder service page only. No Norwegian file was touched. No colours, layout or styling changed. No URL was removed or renamed, so no redirects were needed. The keyword and competitor research that preceded this work is in `docs/co-founder-cluster-seo-research.md`.

---

## 1. Baseline: the questions AI gets asked, and where Aether stood

### The question set

These are the questions the cluster is built to answer, derived from search results, People-also-ask style phrasing, competitor FAQ sections and the way founders phrase the problem in forums and podcasts. Re-test against this exact list (section 7).

**Co-founder coaching (commercial)**
1. What is co-founder coaching?
2. Is co-founder coaching the same as co-founder therapy or couples therapy?
3. How much does co-founder coaching cost?
4. Who offers co-founder coaching in San Francisco / the Bay Area?
5. Who offers co-founder coaching in New York?
6. Does co-founder coaching work online?
7. How do I choose a co-founder coach?
8. How do I convince my co-founder to do coaching?
9. Co-founder coaching vs mediation vs a lawyer: which do we need?

**Co-founder conflict (informational)**
10. Is co-founder conflict normal?
11. How common is co-founder conflict / what percentage of startups fail because of it?
12. What causes co-founder conflict?
13. What are the warning signs of a bad co-founder relationship?
14. Can a co-founder relationship be repaired?
15. How do we break a 50/50 deadlock?
16. Is a 50/50 split a mistake?
17. My co-founder isn't pulling their weight. What do I do?
18. Can you fire a co-founder?
19. Can we renegotiate co-founder equity?
20. Is it too late to add vesting?
21. What questions should co-founders agree on / what is a co-founder prenup?

**Co-founder breakups**
22. When is a co-founder relationship over?
23. How do you separate from a co-founder without killing the company?
24. What happens to a co-founder's equity when they leave?
25. What do you tell the team and investors?

**Co-founder couples**
26. Can a marriage survive co-founding a company?
27. Should married co-founders get couples therapy or co-founder coaching?
28. Who works with co-founder couples in SF / NYC?

### Where Aether stood before this work

- **Not citable as a source for questions 1 to 9.** No page defined co-founder coaching in one sentence, no price was stated, and the words San Francisco, Bay Area and New York did not appear anywhere in the cluster. Competitors (Cofounder Clarity, Cofounder Edge, Adam Dexter, Psychology Today) owned the definitional and "is it therapy" framing.
- **Weak on 11.** The pillar's headline statistic ("second most common reason startups die") matched no source and would have been a liability if an AI checked it. The figure AI answers actually use is Wasserman's 65 percent.
- **No FAQPage schema fired on any of the six articles.** The FAQs were bold text, not H3s, so the site's extractor produced nothing. AI Overviews and Perplexity lean heavily on Q&A-shaped markup.
- **No images, so no ImageObject, no OG image and no sitemap image entries.**
- **No answer-first blocks beneath headings.** Each section opened with narrative; the direct answer sat several paragraphs down.
- **No named frameworks.** The content had original frameworks (six patterns, four readings, the separation order) but none were named, so nothing was liftable as "according to Aether Practice, ...".
- **No llms.txt; robots.txt did not name GPTBot, ClaudeBot or anthropic-ai** (they were allowed by the wildcard, but not explicitly).
- **The service page linked to none of the articles**, and no existing article linked into the cluster.
- **Two gaps with no page:** warning signs (question 13) and a glossary of terms (the definitional questions AI answers love to quote).
- **One cannibalization risk:** the mediation article and the new SF/NY coaching article would both have targeted "co-founder coaching" and both carried an identical cost table.

---

## 2. Every change made

### 2.1 Content: the cluster (11 pages)

| Page | URL | What changed |
|---|---|---|
| Pillar: Co-founder conflict guide | `/blog/co-founder-conflict-guide` | Statistic corrected (Wasserman 65% with attribution, plus post-mortem range). New sections: "How common is co-founder conflict?", "What co-founder coaching is, and when to bring it in", "For founding teams in San Francisco, New York and beyond". Named frameworks: the Six Patterns, Unspoken Terms, the Repairability Check, the seven practices (one-line summary added). FAQ rebuilt as 10 H3 questions including cost, definition, "is it couples therapy", SF/NY. Hero image, research section, links to all 10 other cluster pages. |
| 50/50 deadlock | `/blog/co-founder-5050-deadlock` | Answer-first definition of deadlock; named the Stamina Problem and the four deadlock-breakers; added YC vs law-firm view on equal splits; 7 H3 FAQs; hero; cross-links. |
| Not pulling weight | `/blog/co-founder-not-pulling-weight` | Named the Four Readings; added decision-rights cross-check; 7 H3 FAQs including "burned out or checked out?"; hero; cross-links. |
| Mediation vs coaching | `/blog/co-founder-mediation-vs-coaching` | **De-cannibalized** (see 2.5): title and keywords now target mediation / "which specialist"; cost table replaced by prose that links to the SF/NY article as the canonical cost page; decision table gained rows with links; 8 H3 FAQs; hero. |
| Breakup / exit | `/blog/co-founder-breakup-exit` | Named the Two Terminal Conditions and the Separation Sequence; **HowTo schema** for the six steps; California vs New York non-compete note; 7 H3 FAQs including equity and announcement; hero. |
| Renegotiating equity | `/blog/renegotiating-co-founder-equity` | Named the Forecast Frame; Techstars "revisit during the cliff" point; 7 H3 FAQs including "can you change the split after incorporation"; hero. |
| Co-founder couples | `/blog/co-founder-couples-married` | Tag casing fixed ("Co-Founders") so related-posts treats it as part of the cluster; hero; scope note now routes business co-founders to the cluster; SF/NY FAQ added; links to deadlock, mediation, pillar, service page. |
| **New:** Co-founder coaching in SF and NY | `/blog/co-founder-coaching-san-francisco-new-york` | The commercial and local-intent page: one-sentence definition, comparison table (coaching / "therapy" / executive coaching / mediation / counsel / couples therapy), 2026 cost table with Aether's price, SF and NYC sections, why online, how to choose, how to raise it, 8 FAQs. |
| **New:** Co-founder agreement questions | `/blog/co-founder-agreement-questions` | Named the Six Terms; 30 numbered questions; how to run the conversation; "if you are three years in"; 6 FAQs (co-founder prenup, what to ask a potential co-founder). |
| **New:** Warning signs | `/blog/co-founder-relationship-warning-signs` | 12 ranked signs in three tiers with "what it means / what to do"; "signs that are not warning signs"; scoring; 6 FAQs (red flags, is it normal to argue, can it be saved). |
| **New:** Glossary | `/blog/co-founder-glossary` | 24 terms defined in one or two sentences, Aether's own frameworks marked as such; **DefinedTermSet schema** with all 24 terms (new schema type added to the renderer); 6 definitional FAQs. |

Every cluster page now has: a bolded, self-contained direct answer under its first H2 and under each framework heading; an H2 FAQ with H3 questions that the site turns into FAQPage schema automatically; a hero image with co-founder-specific alt text and a caption; a "Keep reading in this cluster" link block; `modifiedDate` 2026-10-16; "Last updated: October 2026".

### 2.2 Named, quotable frameworks (Aether's own)

All are original to the existing articles and now carry a name and a one-sentence definition so an AI can lift them with attribution. None rests on an invented statistic.

- **The Six Patterns** of co-founder conflict: contribution ledger, 50/50 deadlock, role drift, divergent ambition, the avoided subject, trust erosion by small increments.
- **Unspoken Terms**: the implicit agreement no founding team writes down.
- **The Repairability Check**: eight questions, scored 0–2 / 3–5 / 6+.
- **The Stamina Problem**: deadlock outsources decisions to whoever tolerates more discomfort.
- **The four deadlock-breakers**: domain ownership, named tiebreaker, reversibility test, structural provisions.
- **The Four Readings** of a co-founder who has stopped delivering: burnout, mismatch, disengagement, quiet departure.
- **The Forecast Frame** for reopening equity.
- **The Two Terminal Conditions** for a finished partnership.
- **The Separation Sequence**: six steps in fixed order.
- **The Six Terms** of a co-founder agreement: decision rights, commitment, ambition, money, conflict, exit.
- **Twelve warning signs**, ranked in three tiers.

### 2.3 Service page `/co-founder-coaching`

- Metadata title and description now name San Francisco and New York, the phrase "co-founder therapy" (as what people call it), the price and the free consultation.
- Service schema: `serviceType: "Co-founder coaching"`, `areaServed` adds "San Francisco Bay Area".
- New "Guides for founding teams" section linking all 11 cluster pages, in the existing card style (`components/pages/cofounder-session-page.tsx`).
- Sitemap `lastModified` bumped.

### 2.4 Technical AEO

| Item | Status | File |
|---|---|---|
| robots.txt names AI crawlers | Added GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Perplexity-User, DuckAssistBot, meta-externalagent to the explicit allow list (OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended were already there). Nothing is disallowed except `/api/`. | `app/robots.ts` |
| llms.txt | Created: practice summary, service, every cluster page with a one-line description, related hubs, and a "facts to cite" block (definition, frameworks, price). | `public/llms.txt` |
| Structured data | Validated programmatically on all 12 URLs: BlogPosting (headline, image with width/height, dates, author, publisher, mainEntityOfPage), FAQPage (every answer over 40 characters), BreadcrumbList, HowTo (6 steps, breakup page), DefinedTermSet (24 terms, glossary), Service + BreadcrumbList on the service page. Organization and WebSite come from the root layout. | `components/blog-post.tsx`, `lib/blog.ts` |
| Server-rendered HTML | Confirmed: every page's full text (2,000 to 4,700 words) is in the static HTML; the build prerenders all cluster routes as SSG. | build output |
| Canonicals | Every page's canonical equals its own URL. | validated |
| hreflang | None emitted on cluster pages, correctly: they have no translations. `translationKey` is set on each so a Norwegian twin would pair automatically. | validated |
| Sitemap | All 12 URLs present with `lastmod` and image entries. | `app/sitemap.ts` (auto) |
| Images | Every cluster page has a hero (`image` + `imageAlt`) and an in-body figure with caption. Alt text rewritten to describe the scene in co-founder terms. Served through `next/image` as AVIF/WebP with dimensions (no layout shift). Filenames still say `couple-…` (see section 6). | frontmatter |
| Internal links | Every cluster page links the pillar and 2 to 4 siblings with descriptive anchors; the pillar links all 10 spokes; service page links all 11. | all |
| Page speed | Not changed by this work: static HTML, optimised images, no new scripts. Not re-measured; Lighthouse was not run. | — |

### 2.5 Cannibalization audit

Every cluster page was assigned one primary query family and checked against every other cluster page and the rest of the English blog.

| Page | Primary intent | Overlap found | Resolution |
|---|---|---|---|
| `/co-founder-coaching` (service) | "co-founder coaching" (commercial, booking) | SF/NY article also targets "co-founder coaching" | Deliberate pair: the service page is the conversion target; the article is the long-form informational and geo version. The article links to the service page nine times with "co-founder sessions" / "book" anchors and never competes on the bare service title. Monitor (section 7). |
| Mediation vs coaching | "co-founder mediation", "which specialist" | Had "co-founder coaching", "co-founder coaching cost", "what is co-founder coaching", "co-founder therapy" in keywords and an identical cost table to the SF/NY article | **Fixed:** seoTitle now "Mediation vs Coaching vs a Lawyer: Which Do You Need?", those keywords removed, cost table replaced with prose that links to the SF/NY article as the canonical cost page, cost FAQ reframed around mediation. |
| Pillar vs warning signs | "co-founder conflict" vs "warning signs / red flags" | Pillar has a "Self-check" | Pillar's check is about repairability (8 questions, scored); warning-signs page is observable symptoms (12, ranked). Each links the other and says what the other is for. |
| Pillar vs glossary | "co-founder conflict" vs "what is X" definitional queries | Both define terms | Glossary targets single-term definitional queries and carries DefinedTermSet; the pillar's definitions are in-flow. Glossary links each term to its deep-dive. |
| Agreement questions vs deadlock | "co-founder agreement" vs "50/50 deadlock" | Deadlock has a pre-launch section | Deadlock's pre-launch section is four lines and links to the 30 questions. |
| Co-founder couples vs cluster | "married co-founders" vs business co-founders | Both mention coaching vs therapy | Couples article is in the Founder Couples cluster with `relatedService: /couples-therapy-for-founders`; every cluster page scopes itself to business co-founders and routes couples to the couples article, and vice versa. |
| Cluster vs rest of blog | — | `how-to-choose-couples-therapist-founders-executives` (guide) targets choosing a *couples* therapist; `couples-therapy-founders-executives` targets founder *relationships* | No overlap on co-founder queries. Both now link into the cluster with scoped anchors. |

No two pages share a primary keyword in `seoTitle`. No 301s were needed.

### 2.6 Inbound links from existing English content

| From | To | Anchor |
|---|---|---|
| `/couples-therapy-for-founders` (hub FAQ) | `/co-founder-coaching`, pillar, mediation article | "co-founder coaching", "guide to co-founder conflict", "compare co-founder coaching, mediation and counsel" |
| `/couples-therapy-california` (hub FAQ) | couples article, SF/NY article | "co-founder couples article", "co-founder coaching for San Francisco founding teams" |
| `/couples-therapy-new-york-city` (hub table) | SF/NY article | new row: "We're co-founders, not a couple, and the partnership is strained" |
| `/blog/couples-therapy-founders-executives` (FAQ) | `/co-founder-coaching`, pillar | "co-founder coaching", "guide to co-founder conflict" |
| `/blog/founder-loneliness-partner-side` | pillar | "a co-founder conflict" |
| `/guides/how-to-choose-couples-therapist-founders-executives` | SF/NY article | "how to choose a co-founder coach" |

### 2.7 Files touched

```
app/(en)/co-founder-coaching/layout.tsx        metadata + Service schema
app/robots.ts                                  AI crawler allow list
app/sitemap.ts                                 service page lastModified
components/blog-post.tsx                       DefinedTermSet schema
components/pages/cofounder-session-page.tsx    "Guides for founding teams" links
lib/blog.ts                                    definedTerms frontmatter field
public/llms.txt                                new
content/blog/co-founder-conflict-guide.mdx
content/blog/co-founder-5050-deadlock.mdx
content/blog/co-founder-not-pulling-weight.mdx
content/blog/co-founder-mediation-vs-coaching.mdx
content/blog/co-founder-breakup-exit.mdx
content/blog/renegotiating-co-founder-equity.mdx
content/blog/co-founder-couples-married.mdx
content/blog/co-founder-coaching-san-francisco-new-york.mdx   new
content/blog/co-founder-agreement-questions.mdx               new
content/blog/co-founder-relationship-warning-signs.mdx        new
content/blog/co-founder-glossary.mdx                          new
content/blog/couples-therapy-founders-executives.mdx          one link
content/blog/founder-loneliness-partner-side.mdx              one link
content/blog/how-to-choose-couples-therapist-founders-executives.mdx  one link
content/hubs/couples-therapy-for-founders.mdx                 links + date
content/hubs/couples-therapy-california.mdx                   links + date
content/hubs/couples-therapy-new-york-city.mdx                table row + date
docs/co-founder-cluster-seo-research.md                       research write-up
AEO-REPORT.md                                                 this file
```

Redirects added: none. URLs removed or renamed: none.

---

## 3. New pages and why

| Page | Why it exists |
|---|---|
| **Co-founder coaching in SF and NY** | The commercial question set (1–9) had no informational home. Competitors have no geo page and almost none publish prices; an AI asked "co-founder coach in San Francisco, what does it cost" had nothing of Aether's to cite. This page gives it a definition, a comparison table, a priced table and a city section each. |
| **Co-founder agreement questions** | "Questions to ask a co-founder / co-founder prenup / founders agreement checklist" is a large, early-stage query family that competitors cover only as legal checklists. Aether's angle (the implicit agreement) is distinct, and it is the natural pre-conflict entry point into the cluster. |
| **Warning signs** | "Signs of a bad co-founder relationship / co-founder red flags" is a listicle-shaped query AI answers reach for. The pillar's self-check is about repairability; nothing covered observable symptoms. Ranked lists with "what it means / what to do" are maximally liftable. |
| **Glossary** | Definitional queries ("what is co-founder deadlock", "what is co-founder coaching") are what AI Overviews answer most often. A glossary with DefinedTermSet schema gives each of Aether's frameworks a canonical one-sentence definition under the Aether name. |

---

## 4. Off-site action list (for you), prioritized

The on-site work makes Aether citable. Off-site is what makes AI systems and Google trust it enough to cite. In priority order; the first six are worth doing this month.

### Tier 1: entity and trust signals (do first)

1. **Google Business Profile.** Create one profile per market only if you have a real address or service area you can verify; otherwise create one service-area business (SAB) and set the service area to San Francisco Bay Area, New York City and California. Category: "Business coach" or "Counselor" (pick one primary; "Life coach" is the closest match for co-founder coaching, "Marriage or relationship counselor" for the couples side; do not claim a medical category). Add the Co-Founder Session as a service with the $170 price, the free consultation as an offer, and link the profile to `/co-founder-coaching`. Post the pillar and the SF/NY article as GBP posts.
2. **LinkedIn company page + personal profile alignment.** Company page name "Aether Practice", website aetherpractice.com, specialties "co-founder coaching, couples therapy for founders, executive and founder work". Add the LinkedIn URL, plus every other profile below, to the Organization `sameAs` array in `components/site-root.tsx` (currently Instagram only). Consistent name, URL and description everywhere is the single strongest entity signal.
3. **Crunchbase organization profile** (free): founded year, location(s), category "Coaching / Mental Health", description using the one-sentence definition of co-founder coaching from the pillar. Crunchbase is heavily crawled by AI systems for "who does X" questions.
4. **Psychology Today therapist directory** for the couples side (requires a licence in the listing state; list only where that is true). Mention "married co-founders" in the specialties text. Psychology Today ranks for almost every "therapist for X in [city]" query and AI answers quote it.
5. **Clutch, GoodFirms and Coach Foundation / Noomii directories** for coaching. Low effort, each gives a crawlable third-party page saying "Aether Practice offers co-founder coaching".
6. **Wikidata item.** Create an item for Aether Practice (instance of: psychotherapy practice / coaching company; official website; headquarters; social links). Cheap, permanent, and used by Google's knowledge graph.

### Tier 2: earned citations (next 4 to 8 weeks)

7. **Pitch "best co-founder coach" and "co-founder therapy" roundups.** Targets that already rank: the "Other practitioners and resources in this space" section on cofounderclarity.com/cofounder-coaching (ask to be listed; Dr. Jones lists peers), Vestd's coach partners page, GrowthMentor and MentorCruise (apply as a mentor), Founder Coach directories on Umbrex and Superscout. Draft pitch:

   > Subject: A co-founder coaching resource for your "other practitioners" list
   >
   > Hi [name], I run Aether Practice, an online practice working with founding teams in San Francisco, New York and Norway. We've published a co-founder cluster that may be useful to your readers: a complete guide to co-founder conflict, a 12-sign checklist, a 30-question co-founder agreement, and a plain-language comparison of coaching, mediation and counsel. Our sessions are $170/hour with both founders present, which we publish because almost nobody in this field does. If you keep a list of practitioners or resources, we'd be glad to be on it, and happy to reciprocate from our glossary page. Links: aetherpractice.com/blog/co-founder-conflict-guide · aetherpractice.com/co-founder-coaching

8. **Journalist and researcher outreach.** Kauffman (Emily Fetsch's "Can Relationship Counseling Save Your Startup?" is the most-cited piece), the NPR/KQED reporters who covered co-founder counselling, TechCrunch and Business Insider writers who did the Karat and Kalda stories. Offer the Six Patterns and the price-transparency angle as a story: "co-founder coaching costs $2k–9k a month and nobody publishes it".
9. **HARO / Qwoted / Featured.com** alerts for "co-founder", "founder conflict", "startup partnership". Answer with one Aether framework and a link.
10. **Podcasts.** The Cofounder Therapy podcast (Substack), Founders' Fears & Failures, The Startup Help Desk, Lightcone (YC) is unlikely but the Q&A format fits; smaller: Indie Hackers podcast, SaaS Open Mic, any Bay Area or NYC founder-community podcast. Pitch: "the six patterns behind most co-founder breakups, and why the lawyer is the wrong first call".
11. **Newsletters.** Lenny's Newsletter (guest post on co-founder dynamics), Dave Bailey's newsletter (he writes on cofounders), The Information's founder coverage, Every, Elpha (female founders, strong on co-founder questions). Offer the agreement questions as an excerptable piece.

### Tier 3: community answers (ongoing, 30 minutes a week)

12. **Reddit**: r/startups, r/Entrepreneur, r/ycombinator, r/cofounder, r/SaaS. Search weekly for "co-founder not pulling weight", "50/50 split", "cofounder leaving", "cofounder therapy". Answer substantively with one framework; link only when a mod-tolerant subreddit allows and the link is the direct answer. Draft answer for "my co-founder isn't pulling their weight":

   > Before you decide what it is, find out which of four things it is, because they look identical from outside and need opposite responses: burnout (capacity gone, they want to recover), mismatch (working hard at a role the company has outgrown), disengagement (stopped believing), or quiet departure (already gone, waiting for a vesting date). Write down three specific things that aren't happening (not "they're not pulling their weight", that's a feeling), then ask "what's going on for you?" and stay quiet. Diagnosis in the first conversation, decisions in the second. Raise it at month two, not month twenty; the only reason nobody does is that at month two you're not sure yet. "I'm not sure and I want to check" is a conversation; "I've concluded" is a sentence.

13. **Hacker News**: do not post links. Comment on "Ask HN: co-founder…" threads with the same substance. HN threads rank for years and are quoted by AI systems.
14. **Indie Hackers**: post the 30 questions as a native post (not a link), with a one-line attribution to Aether.
15. **Quora**: answer the evergreen questions ("How do I handle a lazy co-founder", "Should co-founders split 50/50", "What happens when a co-founder leaves") with the frameworks; Quora is still crawled heavily by Perplexity and ChatGPT search.
16. **Y Combinator's Bookface and founder Slack communities** (On Deck, Founders Network, SF and NYC founder groups) if you have access: answer, don't promote.

### Tier 4: entity consistency checklist

- Same practice name, URL, one-sentence description and location set (San Francisco Bay Area, New York City, California, Norway) on: website footer, GBP, LinkedIn, Crunchbase, Psychology Today, Instagram bio, Wikidata, cal.com booking page.
- Add every profile URL to `sameAs` in `components/site-root.tsx`.
- Consider a named practitioner page with Person schema (see section 6).

---

## 5. What to re-test, and when

### Baseline to capture now (before deploy, or immediately after)

Run each of the 28 questions in section 1 through ChatGPT (with search), Perplexity, Claude (with search), Gemini and a Google search in an incognito window from a US location (use a VPN set to San Francisco and then New York for questions 4, 5 and 28). Record: is Aether cited, which URL, in what position, and which competitors are cited. Also record Google rank for the primary term of each cluster page (section 2.5 table) and the number of indexed cluster URLs (`site:aetherpractice.com/blog/co-founder`).

### At 4 weeks (around November 13, 2026)

- Google Search Console: all 11 cluster URLs indexed; impressions for queries containing "co-founder"; which URL Google chose for "co-founder coaching" (should be `/co-founder-coaching`; if the SF/NY article wins instead, that is acceptable but note it).
- Rich-result status in Search Console: FAQ, HowTo and Breadcrumb reports show no errors for the cluster.
- Re-run the 28 questions. Expect: Perplexity and ChatGPT search begin citing the pillar, glossary and SF/NY page for definitional and cost questions; Google AI Overviews probably not yet.
- Check `llms.txt` and `robots.txt` are live at the root; check server logs (Vercel) for GPTBot, ClaudeBot, PerplexityBot hits on cluster URLs.
- Off-site: GBP live, LinkedIn and Crunchbase live, `sameAs` updated.

### At 8 weeks (around December 11, 2026)

- Re-run the 28 questions and the rank check. Target: cited for at least half of questions 1–3, 9–13, 15–17, 22–24 in Perplexity and ChatGPT search; page-one Google for "co-founder coaching san francisco", "co-founder coaching nyc", "co-founder deadlock", "co-founder not pulling weight", "co-founder breakup", "co-founder agreement questions".
- Cannibalization check: for each primary query, confirm Google shows one Aether URL, and it is the intended one. If two Aether URLs appear for the same query, consolidate by tightening the weaker page's title and adding a canonical-style "the full guide is here" link.
- Conversions: bookings and consultation requests whose referrer is a cluster URL (Vercel Analytics + the `BlogViewTracker` events).
- Decide whether to add the Norwegian twins based on whether Norwegian founders are arriving on the English cluster.

---

## 6. Recommended but not done, and why

1. **A visible FAQ on `/co-founder-coaching` with FAQPage schema.** The service page is the conversion target and has no FAQ. Adding one is a layout change to a designed page, which the brief ruled out; it is the single highest-value remaining on-site change. Copy is ready in the SF/NY article's FAQ.
2. **A named practitioner and Person schema.** Every cluster page is bylined "Aether Practice" (Organization). The strongest competitors lead with a named, credentialed person. A practitioner bio page with `Person` schema, linked as `author` from the cluster, would materially help E-E-A-T and AI citation. Not done because it requires real credentials and a name I should not choose or state for you.
3. **Organization `sameAs`** currently lists Instagram only. Add LinkedIn, Crunchbase, Psychology Today, Wikidata and GBP URLs once they exist (section 4).
4. **Image filenames.** Heroes reuse files named `couple-…` with co-founder alt text. Filenames carry little weight and renaming means new files plus 301s for already-indexed images; left as is. If you want co-founder-named copies, add them alongside with redirects in `next.config.mjs` as was done for earlier renames.
5. **Lighthouse / Core Web Vitals.** Not re-measured. Nothing in this work adds client JavaScript or unoptimised assets, so no regression is expected, but a before/after Lighthouse run on the pillar would confirm it.
6. **Speakable schema** on the "Short answer" paragraphs. Google's speakable is still limited to news; skipped as low value.
7. **Norwegian twins** of the cluster. Out of scope (English only). `translationKey` is set on every article so a twin pairs automatically when written.
8. **Service-page FAQ and testimonials** would also strengthen the booking page, but testimonials need real, consented client statements.
9. **A dedicated "co-founder coaching cost" page.** The cost section inside the SF/NY article is the canonical answer for now; if Search Console shows "co-founder coaching cost" as a large query on its own, split it out later rather than now, to avoid cannibalizing a page that has not yet ranked.

---

## 7. Verification performed

- `tsc --noEmit`: clean. `next build`: all 120 routes prerendered, the four new cluster routes present.
- Scripted validation against the running dev server on all 12 URLs: JSON-LD parses; BlogPosting, FAQPage (every answer over 40 characters), BreadcrumbList present on every article; HowTo (6 steps) on the breakup page; DefinedTermSet (24 terms) on the glossary; Service + Breadcrumb on the service page; canonical equals URL on every page; no images without an alt attribute; every internal link in every page returns 200; `robots.txt` names all AI crawlers; `llms.txt` serves 200; sitemap contains all 12 URLs.
- Visual check in the in-app browser of the pillar, glossary, warning signs and the service page's new guides section.
- Nothing committed. Commit when you have reviewed.

---

# Instruments section (October 16, 2026)

Scope: `/instruments` and `/instruments/conflict` (AET01 Conflict), plus contextual links from the English blog. English only. No colours, layout or styling changed: new sections reuse the section's existing heading, body, spec-list and card classes. Every disclaimer kept ("communication practice tool", "not psychotherapy, medical care or crisis support", "model feedback can be wrong"). All URLs live; none renamed; no redirects needed.

## Research: what people search for, and who ranks

| Query family | Who ranks now | What they cover | Gap Aether fills |
|---|---|---|---|
| "app to practice difficult conversations", "practice hard conversations with AI" | Vocal Image's own 2026 roundup, Hard Talk Roleplay Coach, TalkSimulator, Murmur (phone calls), VirtualSpeech (workplace), ICAEW explainer | Scenario role-play with empathy/clarity coaching; workplace-first; most are agreeable coaches | A partner built to **hold a position**, and a rubric that scores **capitulation as a failure**, not only aggression. Personal and co-founder conflicts, not only HR scenarios. |
| "rehearse an argument", "conflict practice simulator" | Stanford's *Rehearsal* research system (Shaikh et al., 2023), itch.io negotiation simulator, Tough Talk Tutor | Research-grade or hobby tools; no polished consumer product owns the phrase | AET01's tagline is the query. The hub FAQ now cites the Stanford result accurately as evidence rehearsal works. |
| "AI roleplay difficult conversations" | Yoodli, RolePlays.ai, Bodyswaps, corporate-training roundups (Elevate, ELM) | Enterprise L&D, interview and sales practice | Consumer, two minutes, no account, no enterprise seat. |
| "assertiveness practice app", "how to say no app" | Assertr (ex-Sparring), TalkFitly, Conversly, How To Say No | Voice coaching scored on assertiveness/empathy | "Firm is not a fail" is a sharper, more quotable version of the same promise. |
| "conflict resolution app couples" | Coupla, Harmony, Bondly, Steve, AngryGF | Couples coaching chatbots and AI "mediators" | Aether is a therapy practice; AET01 sits beside human couples work and says plainly what it is not. |

No competitor combines a product page with a licensed practice behind it, a therapy-adjacent disclaimer discipline, and a blog cluster that explains *why* rehearsal works. That combination is the AEO angle: the page an AI can cite for "what is a conflict rehearsal app and does it work", with an answer it can trust.

## Changes made

### Hub `/instruments` (`app/(en)/instruments/page.tsx`)

- **Title:** "Instruments: Practice Tools for Difficult Conversations" (was "Instruments"). **Meta description** rewritten to name AET01, the two-minute format, no account, and "Not therapy."
- **Copy added**, in the existing voice, below the range card: "What an instrument is" (bolded one-sentence definition, then two paragraphs), "Who they are for", "What they are not", "The range" (spec list: format, session, account, made by), and "Questions" (six-item FAQ). The original headline, standfirst, three-line manifesto and range card are unchanged.
- **Schema:** `CollectionPage` (mainEntity `ItemList` of instruments, each a `SoftwareApplication` stub pointing at its page's `#app` id), an "Aether Instruments" `Brand`+`Organization` entity with `parentOrganization` → the practice's `#organization`, `FAQPage` built from the same array as the visible FAQ, and the existing `BreadcrumbList`.
- **OG image:** dedicated dark image at `/instruments/og` (route handler, `app/(en)/instruments/og/route.tsx`) replacing the practice's light site image.

### AET01 Conflict `/instruments/conflict` (`app/(en)/instruments/conflict/page.tsx`)

- **Title:** "AET01 Conflict: Rehearse an Argument With an AI That Pushes Back" (was "AET01 / Conflict"). **Meta description** names the use case, four levels, score, no account, not therapy.
- **Copy added**: "What it is" (bolded one-sentence definition plus a line placing it under Aether Instruments and beside the practice's human co-founder and couples work), "Who it is for", "What it is not", "Questions" (nine-item FAQ), and a "Platforms" row in the spec list. The intro, Three protocols, Firm is not a fail and Two minutes sections are untouched. "All instruments" link added to the footer row.
- **Store links:** `APP_STORE_URL` and `PLAY_STORE_URL` constants, empty until release. When set, the "Coming to the App Store and Google Play" line becomes the two store links and the schema gains `installUrl`. Nothing invented meanwhile.
- **Schema:** `SoftwareApplication` + `MobileApplication` with `@id … #app`, name, alternateName, description (the definition), `applicationCategory` EducationalApplication, `applicationSubCategory` "Communication practice", `operatingSystem` "iOS, Android", `featureList`, `image` (the OG), `author`/`publisher` → `#organization`, `brand` → `#instruments`, `isPartOf` → the hub; `FAQPage` from the same array; `BreadcrumbList`. **No `offers` block** until the price is public; Google's software rich result wants offers or a rating, so expect the rich result only after release (see ASO checklist).
- **OG image:** dedicated dark masthead at `/instruments/conflict/og`.

Decision noted: the Next.js `opengraph-image.tsx` convention appends a content hash to nested routes' image URLs (`/instruments/og-7fno5v`), so the images are served from plain route handlers at stable paths that the metadata and schema can reference.

### Links added (from → to)

| From | To | Anchor / context |
|---|---|---|
| `/blog/co-founder-conflict-guide`, practice 7 "Rehearse the conversation you are dreading" | `/instruments/conflict` | "AET01 Conflict, our two-minute conflict rehearsal app, scores both losing moves" |
| `/blog/co-founder-mediation-vs-coaching`, "Rehearsal is part of it" | `/instruments/conflict` | "AET01 Conflict, our rehearsal app, gives you a partner that pushes back" |
| `/blog/co-founder-coaching-san-francisco-new-york`, "Slowing the disagreement down" | `/instruments/conflict` | "a model built to hold a position rather than agree" |
| `/blog/co-founder-not-pulling-weight`, Next step | `/instruments/conflict` | "run the opening lines against something that will push back" |
| `/blog/renegotiating-co-founder-equity`, Next step | `/instruments/conflict` | "run them against a partner that will not simply agree" |
| `/blog/co-founder-glossary`, new "Rehearsal" term (also in DefinedTermSet) | `/instruments/conflict` | "AET01 Conflict" |
| `/blog/same-fight-four-conflict-patterns`, FAQ "How do you stop fighting about small things?" | `/instruments/conflict` | "practise holding a position without escalating … AET01 Conflict" |
| `/instruments/conflict` | `/instruments`, `/co-founder-coaching`, `/couples-therapy` | "Aether Instrument", "co-founders", "couples" |
| `public/llms.txt` | `/instruments`, `/instruments/conflict` | new "Aether Instruments" section and a "facts to cite" line |

Not linked: the Four Horsemen and communication-problems articles. Their only rehearsal mentions are about *not* rehearsing the argument during a break, where a product link would be forced. The couples-therapy hub pages were left alone for the same reason.

### Technical

- **Sitemap:** `/instruments` and `/instruments/conflict` bumped to 2026-10-16. `/instruments/conflict/privacy` and `/support` removed from the sitemap because both are `noindex` placeholders; a noindex URL in a sitemap sends Google contradictory signals. Re-add them when the policy and support address ship.
- **Canonicals** equal their URLs; both pages fully server-rendered (700 and 1,000 words of static HTML); both OG routes return `image/png`; every link on both pages resolves. Validated by script against the dev server.
- **robots.txt** already allows all named AI crawlers (changed earlier today); `llms.txt` now describes Instruments.
- **Image alt text and filenames:** the only images on these pages are the inline SVG mark (decorative, `aria-hidden`) and the two generated OG images, whose `alt` text names the product. No raster assets to rename.

### Cannibalization

| Pair | Risk | Resolution |
|---|---|---|
| Hub vs AET01 page | Both about the app | Hub targets the range and the category ("practice tools for difficult conversations", "Aether Instruments"); the app page targets the product and the use case ("rehearse an argument", "AI that pushes back", "AET01 Conflict"). Titles, H1s and FAQs do not overlap. |
| AET01 page vs blog pillar | Pillar's practice 7 is "rehearse the conversation" | Pillar is informational about co-founder conflict and links out; the app page is the product. The anchor text names the app, not the query. |
| AET01 page vs `/co-founder-coaching` | Both mention rehearsal | Service page is human sessions; app page says so explicitly and links to it as the alternative with "a person in the room". |
| Hub vs home page Instruments band | Same headline | The band is a teaser with a "See all instruments" link to the hub; the hub is the indexable page. No change needed. |

## ASO checklist (for you, in App Store Connect and Google Play Console)

Use the same words on the store listings as on the site, so the entity resolves across all three.

1. **App name:** "AET01 Conflict" (App Store allows 30 characters; "AET01 Conflict: Rehearse Hard Talks" fits if you want a keyword in the name). Developer/seller name: Aether Practice.
2. **Subtitle (App Store, 30 chars):** "Rehearse the argument first" or "Practice difficult conversations". **Short description (Play, 80 chars):** "Rehearse an argument against an AI that holds a position. Two minutes. No account."
3. **Keyword field (App Store, 100 chars, comma-separated, no spaces, no repeats of words already in the name/subtitle):** `difficult,conversation,practice,roleplay,assertiveness,argument,confrontation,boundaries,negotiation,coach`
4. **Long description:** open with the one-sentence definition from the site ("AET01 Conflict is a mobile app for rehearsing a difficult conversation against an AI partner that holds a position…"), then the three protocols, then "Firm is not a fail" in two sentences, then the disclaimer verbatim. Google indexes Play descriptions; keep "practice difficult conversations", "rehearse", "conflict", "AI role-play" in the first 250 characters.
5. **Category:** Education (primary) and Productivity or Lifestyle (secondary). Avoid Health & Fitness and Medical: they invite review scrutiny and contradict the "not therapy" position.
6. **Age rating and content:** mark the AI-generated-content and user-generated-content questions honestly; both stores now ask. State in the review notes that the app is a communication practice tool, not a health app.
7. **Screenshots:** first screenshot = the masthead and tagline; second = a Practice round with the score and "the line you should have used"; third = the four levels; fourth = "Firm is not a fail". Caption text on screenshots is indexed by neither store but read by humans; keep it in the site's voice.
8. **Privacy:** publish the real policy at `/instruments/conflict/privacy`, remove the `noindex` there, add the page back to the sitemap, and link the same URL from both store listings. Complete the App Store privacy "nutrition label" and the Play Data safety form consistently with it. "No account" should appear in both.
9. **Support:** replace `[SUPPORT EMAIL]` in `app/(en)/instruments/conflict/support/page.tsx`, remove `noindex`, re-add to sitemap, and use `/instruments/conflict/support` as the support URL in both listings.
10. **Store URLs back to the site:** set `APP_STORE_URL` and `PLAY_STORE_URL` in `app/(en)/instruments/conflict/page.tsx`. The page, the schema's `installUrl` and the "coming soon" line update automatically. Then add an `offers` block (price and currency) to the SoftwareApplication schema so Google's software rich result can fire.
11. **Marketing URL** in both listings: `https://aetherpractice.com/instruments/conflict`. **Developer website:** `https://aetherpractice.com`.
12. **Ratings:** once live, prompt for a review after a completed Debrief, not after a low score. The schema can carry `aggregateRating` once there are real ratings; do not add it before.
13. **Localisation:** English (US) only for now, matching the site. If a Norwegian listing is ever added, add the Norwegian page first so the listing has somewhere to link.

## Re-test for Instruments

Add to the 4- and 8-week checks: "best app to practice difficult conversations", "app to rehearse an argument", "AI that disagrees with you practice", "conflict practice app", "assertiveness practice app" in ChatGPT, Perplexity, Claude and Google. Record whether `/instruments/conflict` is cited and whether the one-sentence definition is quoted. In Search Console, confirm both pages are indexed, the FAQ rich result is valid, and the SoftwareApplication item shows no errors (expect "offers missing" as a warning until release).

## Recommended, not done

- **Publish the privacy policy and support address**, then re-index those two pages. Both stores require them at submission anyway.
- **Add `offers`, `installUrl` and later `aggregateRating`** to the SoftwareApplication schema at release (one constant each; see above).
- **A short demo video or three real screenshots on the product page.** `SoftwareApplication.screenshot` and a `VideoObject` would strengthen the entity. Not done because no real app screenshots exist in the repo and I would not fabricate them.
- **A blog explainer, "Why rehearsing a hard conversation works"**, citing the Stanford *Rehearsal* study (Shaikh et al., 2023), Gottman's work on repair and the simulator analogy, linking to the app. It would own the informational query the app page cannot without diluting its voice. Left for a later pass so the product page is not outranked by its own explainer before launch.
