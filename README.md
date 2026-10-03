# Aether

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_5OdGCsJeBieGSF2HQvd8bHE4Wt77)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## Contact form

Submissions are emailed from the server through [Resend](https://resend.com). Set these environment variables in Vercel (Settings → Environment Variables) for Production and Preview:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | no | Inbox that receives messages. Defaults to the practice Gmail address. |
| `CONTACT_FROM_EMAIL` | no | Sender shown on the email, e.g. `Aether Practice <hello@aetherpractice.com>`. Needs the domain verified in Resend. Until then the default Resend onboarding sender is used, which only delivers to the Resend account owner's address. |

Without `RESEND_API_KEY` the form shows a "could not be sent" message and logs the failure; nothing is silently dropped.
