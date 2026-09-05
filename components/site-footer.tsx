const taglines: Record<string, string> = {
  en: "All rights reserved.",
  no: "Alle rettigheter reservert.",
  pl: "Wszelkie prawa zastrzeżone.",
};

export function SiteFooter({ language }: { language: "en" | "no" | "pl" }) {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 py-10 text-center font-[Roboto,Arial,sans-serif] text-sm text-[#383838]">
      <span className="flex items-center gap-2 text-lg font-medium tracking-tight text-zinc-900">
        <img src="/logo-a.svg" alt="Aether Practice logo" className="h-5 w-5" />
        Aether Practice
      </span>
      <p>
        © {new Date().getFullYear()} Aether Practice. {taglines[language]}
      </p>
    </footer>
  );
}
