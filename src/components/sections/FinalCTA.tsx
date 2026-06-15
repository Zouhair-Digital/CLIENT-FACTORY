"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function FinalCTA() {
  const t = useTranslations("finalCta");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-(--color-gold)/15 via-(--color-navy) to-(--color-navy-dark)" />
      <div className="animate-float-glow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-gold)/10 blur-[150px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">{t("title")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            {t("subtitle")}
          </p>
          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-(--color-gold) px-9 py-4 text-base font-semibold text-(--color-navy) shadow-xl shadow-(--color-gold)/25 transition-all hover:bg-(--color-gold-light) hover:shadow-2xl hover:shadow-(--color-gold)/30"
          >
            {t("button")}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
