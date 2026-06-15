"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";

type Stat = { value: string; suffix: string; label: string; sub: string };

export default function Results() {
  const t = useTranslations("results");
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display heading-accent pb-4 text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <p className="text-gradient-gold font-display text-5xl font-extrabold sm:text-6xl">
                <Counter to={Number(stat.value)} suffix={stat.suffix} />
              </p>
              <p className="font-display mt-3 text-lg font-semibold text-white">{stat.label}</p>
              <p className="mt-2 text-sm text-white/55">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
