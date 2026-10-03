"use client";

import { useActionState, useEffect, useState } from "react";
import { languageLinksFor, localizedPaths } from "@/lib/locale-routes";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@/components/google-analytics";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { contactContent, type LanguageCode } from "@/lib/service-content";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const formCopy: Record<LanguageCode, { name: string; email: string; message: string; send: string; sending: string; sent: string; invalid: string; unavailable: string }> = {
  en: {
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent and we will reply by email.",
    invalid: "Please fill in your name, a valid email address and a message.",
    unavailable: "The message could not be sent right now. Please try again shortly or email us directly.",
  },
  no: {
    name: "Navn",
    email: "E-post",
    message: "Melding",
    send: "Send melding",
    sending: "Sender…",
    sent: "Takk. Meldingen din er sendt, og vi svarer på e-post.",
    invalid: "Fyll inn navn, en gyldig e-postadresse og en melding.",
    unavailable: "Meldingen kunne ikke sendes akkurat nå. Prøv igjen om litt.",
  },
};

const initialState: ContactState = { status: "idle" };

const privacyNotice: Record<LanguageCode, { text: string; linkLabel: string }> = {
  en: {
    text: "Information submitted through this form is used only to respond to your message. Details:",
    linkLabel: "Privacy Policy",
  },
  no: {
    text: "Opplysninger sendt inn via skjemaet brukes kun til å svare på meldingen din. Detaljer:",
    linkLabel: "Personvernerklæring",
  },
};

const languageLinks = languageLinksFor("contact");

export default function ContactPage({ language }: { language: LanguageCode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = contactContent[language];

  const f = formCopy[language];
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

  useEffect(() => {
    if (state.status !== "sent") return;
    const params = { page: window.location.pathname };
    track("contact_form_submit", params);
    sendGAEvent("contact_form_submit", params);
  }, [state]);

  return (
    <main id="main-content" className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={language}
        languageLinks={languageLinks}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
      />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          {t.title}
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.intro}
        </p>

        {state.status === "sent" ? (
          <div
            role="status"
            className="mt-20 flex max-w-xl flex-col gap-5 rounded-2xl border border-zinc-300/80 bg-[#eee2db]/80 p-8 sm:p-10"
          >
            <p className="font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-zinc-900">{f.sent}</p>
          </div>
        ) : (
          <form
            action={formAction}
            className="mt-20 flex max-w-xl flex-col gap-5 rounded-2xl border border-zinc-300/80 bg-[#eee2db]/80 p-8 sm:p-10"
          >
            <input type="hidden" name="language" value={language} />
            {/* Honeypot: hidden from people, filled by bots. */}
            <div className="hidden" aria-hidden="true">
              <label>
                Company
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-zinc-500">{f.name}</span>
              <input
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                className="border-b border-zinc-900/20 bg-transparent py-2 font-[Roboto,Arial,sans-serif] text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-zinc-500">{f.email}</span>
              <input
                type="email"
                name="email"
                required
                maxLength={320}
                autoComplete="email"
                className="border-b border-zinc-900/20 bg-transparent py-2 font-[Roboto,Arial,sans-serif] text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-zinc-500">{f.message}</span>
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={4}
                className="resize-none border-b border-zinc-900/20 bg-transparent py-2 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
              />
            </label>
            {state.status === "error" && (
              <p role="alert" className="font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#74382f]">
                {state.reason === "invalid" ? f.invalid : f.unavailable}
              </p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="mt-2 self-start border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 disabled:cursor-wait disabled:opacity-60"
            >
              {isPending ? f.sending : f.send}
            </button>
          </form>
        )}
        <p className="mt-4 max-w-xl font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-zinc-500">
          {privacyNotice[language].text}{" "}
          <Link href={localizedPaths.privacy[language]} className="underline underline-offset-2 hover:text-zinc-900">
            {privacyNotice[language].linkLabel}
          </Link>
          .
        </p>
      </section>
      <SiteFooter language={language} />
    </main>
  );
}
