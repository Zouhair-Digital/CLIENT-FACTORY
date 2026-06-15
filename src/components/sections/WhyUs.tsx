"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BarChart3, Workflow, LineChart } from "lucide-react";

const ICONS = [BarChart3, Workflow, LineChart];

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display heading-accent pb-4 text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-(--color-gold)/15 bg-gradient-to-b from-white/[0.05] to-transparent p-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-gold)/10 text-(--color-gold)">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-display mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
