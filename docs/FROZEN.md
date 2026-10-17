# Frozen: service slabs and contact form

Frozen by Marta on October 17, 2026. Git tag: `frozen-2026-10-17`.

**Do not change anything on this page without Marta asking for that exact change.** That covers no tweaks, no "small improvements", no reverts, no re-exports of the image, no class reordering, and no refactors that touch these lines. If a task seems to need a change here, stop and ask first.

## What is frozen

### 1. The texture file

`public/sand-texture.png`

| | |
|---|---|
| Size | 400 × 400 px, 23,109 bytes |
| MD5 | `c1a3956a6b00915a3acc940ed393d584` |
| Origin | the texture from commit `da067c0` (Oct 15), restored in `65b525b` |

It has a distinct thick vertical streak about two-thirds of the way across the slab. That streak is part of the approved look.

Check it with:

```sh
md5 -q public/sand-texture.png   # must print c1a3956a6b00915a3acc940ed393d584
```

### 2. The service slabs on the home page

`components/home-client.tsx`, the slab `<Link>` className:

```
group rounded-2xl border border-zinc-300/80 bg-[#F7F2EC] bg-[url('/sand-texture.png')] bg-cover bg-center bg-blend-multiply p-8 transition-colors duration-200 hover:border-[#C4B5AB] hover:bg-[#F4EDE6] sm:p-14
```

### 3. The contact form card, in both states

`components/pages/contact-page.tsx`:

- "Sent" state: `flex h-fit flex-col gap-5 rounded-2xl border border-zinc-300/80 bg-[#F7F2EC] bg-[url('/sand-texture.png')] bg-cover bg-center bg-blend-multiply p-8 sm:p-10`
- The form: `flex h-fit flex-col gap-6 rounded-2xl border border-zinc-300/80 bg-[#F7F2EC] bg-[url('/sand-texture.png')] bg-cover bg-center bg-blend-multiply p-8 sm:p-10`

Specifically: the base colour `#F7F2EC`, `bg-cover bg-center` (not a tile and not a fixed size), `bg-blend-multiply`, and the border and hover colours.

## Why this file exists

On Oct 15 a deeper texture went live (`da067c0`) and was reverted 20 minutes later (`3805167`). The revert went out under the same filename, so browsers kept showing the deeper texture. The look Marta approved was therefore the deeper texture under the reverted classes, a combination that wasn't in the repo. When browsers finally loaded the real file on Oct 17, the slabs went lighter and lost the streak. `65b525b` put the deeper texture into the repo so the live site matches what was approved.

The live slab was measured against Marta's Oct 15 reference screenshot at the same width (1308 px): it comes out 5.7% darker than the page, with the same texture contrast, and the streak pattern matches.

## Rule for any image on this site

Never replace an image under the same filename to change how it looks. Browsers keep the old copy, so what people see stops matching the code. Use a new filename instead.
