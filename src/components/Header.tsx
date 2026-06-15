"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#hero", label: t("home") },
    { href: "#method", label: t("process") },
    { href: "#why", label: t("services") },
    { href: "#cases", label: t("about") },
    { href: "#faq", label: t("faq") },
    { href: "#contact", label: t("contact") },
  ];

  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-(--color-navy-dark)/90 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" aria-label="Client Factory">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-(--color-gold)"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher light />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-(--color-gold) px-5 py-2.5 text-sm font-semibold text-(--color-navy) shadow-md shadow-(--color-gold)/20 transition-all hover:bg-(--color-gold-light)"
          >
            {tHeader("cta")}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-(--color-navy-dark)/98 px-4 py-6 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/85 transition-colors hover:text-(--color-gold)"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <LanguageSwitcher light />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-(--color-gold) px-5 py-3 text-sm font-semibold text-(--color-navy)"
            >
              {tHeader("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
