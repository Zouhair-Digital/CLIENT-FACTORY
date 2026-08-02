"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Globe, Gauge, Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";

const FEATURE_ICONS = [Globe, Gauge, Smartphone];

export default function WebService() {
  const t = useTranslations("webService");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const features = t.raw("features") as string[];

  return (
    <section id="web-service" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-(--color-navy-light)/40"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 94%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-(--color-gold)/30 bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
            {t("badge")}
          </span>

          <h2 className="font-display mt-6 text-3xl font-bold leading-tight sm:text-4xl">
            {t("title")}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
            {t("subtitle")}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-gold)/15 text-(--color-gold)">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-white/80 sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/sites-web"
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-(--color-gold) px-8 py-4 text-base font-semibold text-(--color-navy) shadow-lg shadow-(--color-gold)/25 transition-all hover:bg-(--color-gold-light) hover:shadow-xl hover:shadow-(--color-gold)/30"
          >
            {t("cta")}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 px-2 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="space-y-3 rounded-2xl bg-(--color-navy-dark)/60 p-6">
              <div className="h-3 w-24 rounded-full bg-(--color-gold)/40" />
              <div className="h-5 w-4/5 rounded-md bg-white/15" />
              <div className="h-3 w-3/5 rounded-full bg-white/10" />
              <div className="mt-5 grid grid-cols-3 gap-3">
                {FEATURE_ICONS.map((Icon, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-xl bg-(--color-gold)/10 text-(--color-gold)"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
              <div className="mt-5 h-10 w-full rounded-full bg-gradient-to-r from-(--color-gold) to-(--color-gold-light)" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
