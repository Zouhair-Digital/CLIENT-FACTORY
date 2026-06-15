"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Target, Video, Megaphone, UserPlus, Handshake } from "lucide-react";

const ICONS = [Search, Target, Video, Megaphone, UserPlus, Handshake];

type Step = { number: string; title: string; desc: string };

export default function Method() {
  const t = useTranslations("method");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="method" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-(--color-navy-light)/40"
        style={{ clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display heading-accent pb-4 text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base text-white/60 sm:text-lg">{t("subtitle")}</p>
        </div>

        {/* Desktop timeline */}
        <div className="relative mt-24 hidden lg:block">
          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, i) => {
              const Icon = ICONS[i];
              const isUp = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: isUp ? 30 : -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {isUp && <StepCard step={step} />}
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--color-gold) bg-(--color-navy) text-(--color-gold) ${
                      isUp ? "mt-6" : "mb-6"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="font-display absolute -top-2 -end-1 rounded-full bg-(--color-gold) px-1.5 text-[10px] font-bold text-(--color-navy)">
                      {step.number}
                    </span>
                  </div>
                  {!isUp && <StepCard step={step} />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet timeline */}
        <div className="mt-16 space-y-6 lg:hidden">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-(--color-gold) bg-(--color-navy) text-(--color-gold)">
                    <Icon className="h-5 w-5" />
                    <span className="font-display absolute -top-2 -end-1 rounded-full bg-(--color-gold) px-1.5 text-[10px] font-bold text-(--color-navy)">
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <span className="mt-2 h-full w-px flex-1 bg-(--color-gold)/25" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-display text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition-colors hover:border-(--color-gold)/30">
      <h3 className="font-display text-sm font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-white/55">{step.desc}</p>
    </div>
  );
}
