"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, PlayCircle, Target, TrendingUp, Zap } from "lucide-react";

const STAT_ICONS = [Target, TrendingUp, Zap];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-(--color-navy-light) via-(--color-navy) to-(--color-navy-dark)" />

      {/* Glow orbs */}
      <div className="animate-float-glow absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-(--color-gold)/10 blur-[120px]" />
      <div
        className="animate-float-glow absolute bottom-0 end-0 h-[28rem] w-[28rem] rounded-full bg-(--color-gold)/5 blur-[140px]"
        style={{ animationDelay: "2s" }}
      />

      {/* Animated growth lines */}
      <div className="growth-lines opacity-30">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M -50 650 C 150 600, 250 500, 400 480 S 650 350, 800 280 S 1050 100, 1300 50"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
          />
          <path
            d="M -50 750 C 200 700, 350 600, 500 600 S 750 450, 900 400 S 1100 220, 1300 180"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M -50 550 C 100 500, 300 420, 450 380 S 700 280, 850 220 S 1050 60, 1300 -20"
            fill="none"
            stroke="#F1D978"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-(--color-gold)/30 bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
            {t("badge")}
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient-gold">{t("headline")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {t("subheadline")}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-(--color-gold) px-8 py-4 text-base font-semibold text-(--color-navy) shadow-lg shadow-(--color-gold)/25 transition-all hover:bg-(--color-gold-light) hover:shadow-xl hover:shadow-(--color-gold)/30"
            >
              {t("ctaPrimary")}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
            <a
              href="#method"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-(--color-gold)/50 hover:bg-white/5"
            >
              <PlayCircle className="h-5 w-5 text-(--color-gold)" />
              {t("ctaSecondary")}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {t.raw("stats").map((stat: string, i: number) => {
              const Icon = STAT_ICONS[i];
              return (
                <div key={stat} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-gold)/10 text-(--color-gold)">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white/75">{stat}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative mx-auto aspect-square max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8 backdrop-blur-sm">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  +250%
                </span>
                <span className="h-12 w-12 rounded-full bg-(--color-gold)/15" />
              </div>

              {/* Bar chart mock */}
              <div className="flex h-48 items-end justify-between gap-3">
                {[35, 55, 40, 70, 60, 90, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                    className={`w-full rounded-t-md ${
                      i === 6
                        ? "bg-gradient-to-t from-(--color-gold) to-(--color-gold-light)"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-gold)/15 text-(--color-gold)">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t.raw("stats")[0]}</p>
                  <p className="font-display text-lg font-semibold text-white">
                    Client Factory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
