# Aether Practice

Marketing site and blog for Aether Practice, an online therapy and coaching practice. Built with Next.js (App Router), React and Tailwind, deployed on Vercel from the `main` branch.

## Structure

- `app/(en)` — English site at the root (`/`, `/couples-therapy`, `/blog`, …).
- `app/(no)` — Norwegian site under `/no` (`/no/parterapi`, `/no/blog`, …) plus the Norway landing page. Each group has its own root layout, which fixes the page language per URL.
- `components/pages` — page bodies shared by both languages; the route passes `language`.
- `content/blog` — one MDX file per post. Frontmatter: `title`, `description`, `date`, `lang` (`en` | `no`), `tags`, `relatedService`, optional `seoTitle`, `seoDescription`, `modifiedDate`, `image`, `translationKey` (shared by the translations of one article), `lede` (standfirst), `intro` (extra opening paragraphs), `toc` (label + exact H2 text per entry) and `faq` (only when the schema should differ from the post's own FAQ section, which is otherwise read automatically).
- `lib/locale-routes.ts` — the EN/NO URL map, hreflang helpers and post paths.
- `lib/blog.ts` — post loading; `lib/blog-faq.ts` derives FAQ schema from a post's FAQ section.

Norwegian posts live under `/no/blog`; their former `/blog` URLs redirect (see `next.config.mjs`).

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm build
```

## Contact form

Submissions are emailed from the server through [Resend](https://resend.com). Set these environment variables in Vercel (Settings → Environment Variables):

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | no | Inbox that receives messages. Defaults to the practice Gmail address. |
| `CONTACT_FROM_EMAIL` | no | Sender shown on the email, e.g. `Aether Practice <hello@aetherpractice.com>`. Needs the domain verified in Resend. Until then Resend's onboarding sender is used, which only delivers to the Resend account owner's address. |

Without `RESEND_API_KEY` the form shows a "could not be sent" message and logs the failure; nothing is silently dropped.
