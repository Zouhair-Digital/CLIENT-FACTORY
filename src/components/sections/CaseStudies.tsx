"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, GraduationCap, Briefcase, ArrowUpRight } from "lucide-react";

const ICONS = [Building2, GraduationCap, Briefcase];

type CaseItem = {
  industry: string;
  company: string;
  challenge: string;
  solution: string;
  result: string;
};

export default function CaseStudies() {
  const t = useTranslations("caseStudies");
  const items = t.raw("items") as CaseItem[];

  return (
    <section id="cases" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display heading-accent pb-4 text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base text-white/60 sm:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-(--color-gold)/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-gold)/10 text-(--color-gold)">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-(--color-gold)">
                      {item.industry}
                    </p>
                    <p className="font-display text-sm font-semibold text-white">
                      {item.company}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-white/80">{t("challengeLabel")}</p>
                    <p className="mt-1 text-white/55">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">{t("solutionLabel")}</p>
                    <p className="mt-1 text-white/55">{item.solution}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-(--color-gold)/20 bg-(--color-gold)/5 px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      {t("resultLabel")}
                    </p>
                    <p className="font-display text-base font-bold text-(--color-gold)">
                      {item.result}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-(--color-gold) transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
