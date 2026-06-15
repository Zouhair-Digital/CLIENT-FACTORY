"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LOCALE_LABELS: Record<string, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
};

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          light
            ? "border-white/20 text-white hover:border-(--color-gold)/60 hover:text-(--color-gold)"
            : "border-(--color-navy)/15 text-(--color-navy) hover:border-(--color-gold) hover:text-(--color-gold)"
        }`}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <div className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-(--color-navy-dark) py-1 shadow-xl shadow-black/40">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-white/5 ${
                loc === locale ? "text-(--color-gold)" : "text-white"
              }`}
            >
              <span>{LOCALE_LABELS[loc]}</span>
              <span className="text-xs uppercase opacity-60">{loc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
