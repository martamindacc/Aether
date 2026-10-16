# Co-founder cluster: keyword, competitor and AEO research (October 2026)

Research behind the October 2026 rewrite of the English co-founder cluster. Markets: New York City and California, with the San Francisco Bay Area as the priority.

## 1. What people search for, and the intent behind it

| Query family | Intent | What the searcher wants answered | Where we answer it now |
|---|---|---|---|
| co-founder coaching, cofounder coach, co-founder coaching san francisco / nyc / bay area | Commercial, local | What is it, is it therapy, what does it cost, who does it near me, does it work online | `/blog/co-founder-coaching-san-francisco-new-york`, `/co-founder-coaching`, `/blog/co-founder-mediation-vs-coaching` |
| co-founder therapy, couples therapy for co-founders, cofounder couples therapy | Commercial, curious | Is this a real thing, is it the same as couples therapy, who offers it | Same pages; the phrase appears once per page as "what founders call it" |
| co-founder conflict, cofounder conflict, how to resolve co-founder disputes, co-founder relationship | Informational | Is it normal, how common, what causes it, can it be fixed, when to get help | `/blog/co-founder-conflict-guide` (pillar) |
| how common is co-founder conflict, what percentage of startups fail because of co-founders | Informational, citation-seeking | A number with a source | Pillar: Wasserman 65% with attribution, plus post-mortem range |
| 50/50 co-founder split, co-founder deadlock, is a 50/50 split a bad idea, 51/49 | Informational | Is the split a mistake, how to break deadlock, what investors think | `/blog/co-founder-5050-deadlock` |
| co-founder not pulling weight, lazy co-founder, co-founder checked out, can you fire a co-founder | Informational, distressed | How to raise it, burnout vs disengagement, what happens to equity | `/blog/co-founder-not-pulling-weight` |
| renegotiating co-founder equity, change equity split after incorporation, add vesting founder shares | Informational | Is it possible, how to raise it, alternatives | `/blog/renegotiating-co-founder-equity` |
| co-founder breakup, co-founder leaving, removing a co-founder, what happens to equity when co-founder leaves | Informational, distressed | Is it over, the sequence, equity, what to tell team and investors | `/blog/co-founder-breakup-exit` (now with HowTo schema) |
| co-founder mediation, mediator vs lawyer vs coach, co-founder coaching cost | Commercial | Which specialist, what each costs | `/blog/co-founder-mediation-vs-coaching` (now with a cost table) |
| co-founder agreement, questions to ask a co-founder, co-founder prenup, co-founder vows, founders agreement checklist | Informational, early stage | A checklist, how to run the conversation | `/blog/co-founder-agreement-questions` (new) |
| married co-founders, co-founder couples, running a startup with your spouse, couplepreneurs | Informational and commercial | Can it work, what is different, therapy vs coaching | `/blog/co-founder-couples-married` |

## 2. Who ranks now

### Practitioners (commercial queries)

| Who | Where | Format and price | What they cover | Gaps |
|---|---|---|---|---|
| Cofounder Clarity (Dr. Matthew Jones) | Denver, remote | Retainers roughly $2,000–9,000/month, 3-month minimum | Long "definitive guide" with a named conflict taxonomy, FAQ, credentials, other practitioners listed | No geo pages, no married-co-founder angle, price only as a range |
| Cofounder Edge (Sasha Lustgarten) | Not stated | From $1,999/month, three programmes | Trust, alignment, communication; cites MIT and Harvard figures | No FAQ, thin on how-to content |
| The Startup Founder Coach (Adam Dexter) | San Francisco | Not published | Five conflict patterns, coaching plus mediation, Series A focus | No pricing, no FAQ content visible, no NYC |
| InnerWork Coaching | Not stated | $6,000 for one individual meeting each plus six joint sessions | Pattern work | No credentials on page, no FAQ |
| Series Coaching | Not stated | Not published | Individual meetings then five group sessions | Thin |
| Scale Yourself (Amy Buechler, ex-YC founder coach) | San Francisco | Not published | Founder coaching with cofounder conflict as a topic | Page blocked to fetch; general founder coaching, not co-founder specific |
| Dave Bailey | London and San Francisco | Not published | Executive coaching for venture-backed CEOs, essays on cofounders | Individual coaching, not co-founder pairs |
| Alisa Cohn | New York | Not published | Executive coaching for startup CEOs, "cofounder prenup" book | Individual, not pairs |

Nobody with a strong, FAQ-rich page specifically for NYC. The Bay Area has several individual coaches but only one co-founder-pair specialist with location stated. Almost nobody publishes a session price. Aether's $170 per 60-minute session is an order of magnitude below the published retainers and is the clearest differentiator; it is now stated on every cluster page.

### Editorial (informational queries and AI answers)

- Psychology Today, "Why Cofounder Coaching May Be the Future of Startup Success" (Jones, June 2025): defines the field and distinguishes it from therapy, facilitation, mediation and executive coaching.
- First Round Review (Rachel Lockett, 2025): five practices, "co-founder vows", weekly 1:1s, quarterly offsites, Nonviolent Communication. Also the Esther Perel piece on recurring co-founder fights.
- Y Combinator Library and podcasts: founder conflict is a process problem; weekly founder syncs; raise it early; equal splits preferred.
- Kauffman Foundation, "Can Relationship Counseling Save Your Startup?": Wasserman data, Thiel on role clarity, NPR and NYT reporting on SF psychologists.
- NPR and KQED (2015): couples counselling catches on with tech co-founders; SF psychologist reporting requests doubling.
- Law-firm explainers (Orrick, Perkins Coie, Harper James, LegalVision) own the deadlock-mechanism and vesting queries.
- HBR case "Couples Therapy for Co-Founders" and a 2025 American Journal of STEM Education paper applying couple-therapy principles to co-founders.

## 3. The statistics AI answers reach for

- Wasserman, *The Founder's Dilemmas*: roughly 65% of high-potential startup failures attributed to founder conflict; founding teams of friends or family least stable; each additional prior social relationship raised departure likelihood. Universally cited; we now cite it with attribution and hedging instead of the previous "second most common reason startups die" claim, which did not match any source.
- CB Insights post-mortems: "team problems" or "not the right team" in roughly 14–23% of failures. Cited in the pillar as a range.
- A "2026 study of 150+ departures" (35% clean exits, 18% litigation) circulates on blogs but could not be traced to a primary source; not used.

## 4. Gaps we filled

1. **FAQPage schema fired on none of the six articles.** The FAQs used bold questions; the extractor needs H3s. Every cluster page now emits FAQPage (6–10 questions each), verified in the rendered HTML.
2. **No images.** All six were imageless, so no OG image, no sitemap image entries, no ImageObject in BlogPosting. Each now has a hero reused from the existing library with co-founder-specific alt text and a caption. Swap any you dislike; the frontmatter `image` and the first body line are the only two places.
3. **No geo signal.** The cluster never mentioned San Francisco, the Bay Area or NYC. Added a geo section to the pillar, a dedicated SF/NY article, geo FAQs on the pillar and the couples article, and "San Francisco Bay Area" to the service page schema and metadata.
4. **No definitional block for AI answers.** Added a one-sentence bolded definition of co-founder coaching to the pillar and the new article, plus "what is / how much / is it therapy" FAQs everywhere.
5. **No cost content.** Added a published-price table and a cost FAQ; Aether's price stated on every page.
6. **Service page linked to no articles.** Added a "Guides for founding teams" grid linking all nine cluster pages, in the existing card style.
7. **Weak cross-linking.** Every spoke now links the pillar, two to four sibling spokes, and the service page; the pillar links every spoke; the founder-couples and California hubs link into the cluster; the couples article links both ways.
8. **Tag casing.** The couples article used "Co-founders"; now "Co-Founders", so the related-posts algorithm treats it as part of the cluster.
9. **Separation article** now carries HowTo schema for the six-step sequence.
10. **Two new spokes**: co-founder coaching in SF and NY (commercial and local intent), and the 30-question co-founder agreement (early-stage intent that competitors cover only as legal checklists).

## 5. Recommendations not done here

- **Visible FAQ on `/co-founder-coaching`** with matching FAQPage schema. The service page is the money page and has no FAQ; adding one would be a design change, so it was left for you to approve.
- **Image filenames.** Heroes reuse files named `couple-...`. Filenames carry little weight, but if you want co-founder-named copies, add them with 301s in `next.config.mjs` as was done for earlier renames.
- **A Google Business Profile** or at least consistent NAP for "San Francisco" and "New York" would help the local-pack side of "co-founder coaching near me", which content alone cannot win.
- **Author entity.** Articles are bylined "Aether Practice". A named practitioner with a Person schema and a bio page would strengthen E-E-A-T against competitors who lead with a licensed psychologist's credentials.
- **Norwegian twins** for the cluster, if the co-founder service ever launches in Norway; `translationKey` is already set on every article.
