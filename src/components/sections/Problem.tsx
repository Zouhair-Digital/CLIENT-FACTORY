"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MegaphoneOff, Compass, TrendingDown, Users, Activity } from "lucide-react";

const ICONS = [MegaphoneOff, Compass, TrendingDown, Users, Activity];

export default function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display heading-accent pb-4 text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base text-white/60 sm:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-(--color-gold)/30 hover:bg-white/[0.06] ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-gold)/10 text-(--color-gold) transition-colors group-hover:bg-(--color-gold)/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-5 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
