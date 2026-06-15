"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  User,
  Building2,
  Target,
  Wallet,
  FileText,
  CalendarCheck,
} from "lucide-react";
import CalendlyEmbed, { type BookingSlot } from "@/components/CalendlyEmbed";

const STEP_ICONS = [User, Building2, Target, Wallet, FileText, CalendarCheck];
const TOTAL_STEPS = 6;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  industry: string;
  challenge: string;
  budget: string;
  description: string;
  booking: BookingSlot;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  website: "",
  industry: "",
  challenge: "",
  budget: "",
  description: "",
  booking: { date: "", time: "", timezone: "Africa/Casablanca" },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{6,}$/;

export default function ConsultationForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const challengeOptions = t.raw("fields.challengeOptions") as string[];
  const budgetOptions = t.raw("fields.budgetOptions") as string[];
  const benefits = t.raw("benefits") as string[];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep(current: number): boolean {
    const newErrors: Partial<Record<string, string>> = {};

    if (current === 1) {
      if (!data.fullName.trim()) newErrors.fullName = t("errors.required");
      if (!data.email.trim()) newErrors.email = t("errors.required");
      else if (!EMAIL_REGEX.test(data.email)) newErrors.email = t("errors.invalidEmail");
      if (!data.phone.trim()) newErrors.phone = t("errors.required");
      else if (!PHONE_REGEX.test(data.phone)) newErrors.phone = t("errors.invalidPhone");
    }

    if (current === 2) {
      if (!data.companyName.trim()) newErrors.companyName = t("errors.required");
      if (!data.industry.trim()) newErrors.industry = t("errors.required");
    }

    if (current === 3) {
      if (!data.challenge) newErrors.challenge = t("errors.required");
    }

    if (current === 4) {
      if (!data.budget) newErrors.budget = t("errors.required");
    }

    if (current === 5) {
      if (!data.description.trim()) newErrors.description = t("errors.required");
    }

    if (current === 6) {
      if (!data.booking.date) newErrors.date = t("errors.required");
      if (!data.booking.time) newErrors.time = t("errors.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    if (step === TOTAL_STEPS) {
      submitForm();
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  async function submitForm() {
    setIsSubmitting(true);
    console.log("Starting form submission...");
    console.log("Form data:", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      website: data.website,
      industry: data.industry,
      challenge: data.challenge,
      budget: data.budget,
      description: data.description,
      booking: {
        date: data.booking.date,
        time: data.booking.time,
        timezone: data.booking.timezone,
      },
    });

    try {
      const webhookUrl =
        "https://script.google.com/macros/s/AKfycbxHV8PdPtiPl8B7TleWuSGEifuCoy-P34Rw9lfB9WiTW4blbQq2Y3hhjqGEVO_U6ldF0A/exec";

      const response = await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName,
          website: data.website,
          industry: data.industry,
          challenge: data.challenge,
          budget: data.budget,
          description: data.description,
          booking: {
            date: data.booking.date,
            time: data.booking.time,
            timezone: data.booking.timezone,
          },
        }),
      });

      console.log("Webhook response status:", response.status);

      setSubmitted(true);
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred while submitting the form";
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  const inputClass =
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-(--color-gold)";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Side panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-3xl border border-(--color-gold)/20 bg-gradient-to-b from-(--color-gold)/10 to-transparent p-8">
              <h2 className="font-display text-2xl font-bold text-(--color-gold) sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                {t("subtitle")}
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-gold)/15 text-(--color-gold)">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-white/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Wizard */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--color-gold)/15 text-(--color-gold)">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-display mt-6 text-2xl font-bold text-white">
                      {t("confirmation.title")}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-white/65 sm:text-base">
                      {t("confirmation.message")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="wizard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Step indicator */}
                    <div className="mb-10 flex items-center justify-between">
                      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                        const idx = i + 1;
                        const Icon = STEP_ICONS[i];
                        const isActive = idx === step;
                        const isDone = idx < step;
                        return (
                          <div key={idx} className="flex flex-1 flex-col items-center">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors sm:h-12 sm:w-12 ${
                                isActive
                                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-navy)"
                                  : isDone
                                    ? "border-(--color-gold) bg-(--color-gold)/15 text-(--color-gold)"
                                    : "border-white/15 text-white/40"
                              }`}
                            >
                              {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                            </div>
                            <span
                              className={`mt-2 hidden text-center text-[11px] font-medium sm:block ${
                                isActive ? "text-(--color-gold)" : "text-white/40"
                              }`}
                            >
                              {t(`steps.${idx}`)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
                        transition={{ duration: 0.25 }}
                      >
                        {step === 1 && (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.fullName")}
                              </label>
                              <input
                                value={data.fullName}
                                onChange={(e) => update("fullName", e.target.value)}
                                className={`${inputClass} ${errors.fullName ? "border-red-400/60" : "border-white/15"}`}
                              />
                              {errors.fullName && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
                              )}
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.email")}
                              </label>
                              <input
                                type="email"
                                value={data.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="example@email.com"
                                className={`${inputClass} ${errors.email ? "border-red-400/60" : "border-white/15"}`}
                              />
                              {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                              )}
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.phone")}
                              </label>
                              <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                placeholder="06 12 34 56 78"
                                className={`${inputClass} ${errors.phone ? "border-red-400/60" : "border-white/15"}`}
                              />
                              {errors.phone && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.companyName")}
                              </label>
                              <input
                                value={data.companyName}
                                onChange={(e) => update("companyName", e.target.value)}
                                className={`${inputClass} ${errors.companyName ? "border-red-400/60" : "border-white/15"}`}
                              />
                              {errors.companyName && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.companyName}</p>
                              )}
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.website")}
                              </label>
                              <input
                                value={data.website}
                                onChange={(e) => update("website", e.target.value)}
                                placeholder="https://"
                                className={`${inputClass} border-white/15`}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-white/70">
                                {t("fields.industry")}
                              </label>
                              <input
                                value={data.industry}
                                onChange={(e) => update("industry", e.target.value)}
                                className={`${inputClass} ${errors.industry ? "border-red-400/60" : "border-white/15"}`}
                              />
                              {errors.industry && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.industry}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <label className="mb-4 block text-sm font-medium text-white/70">
                              {t("fields.challengeLabel")}
                            </label>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {challengeOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => update("challenge", opt)}
                                  className={`rounded-xl border px-5 py-4 text-start text-sm font-medium transition-colors ${
                                    data.challenge === opt
                                      ? "border-(--color-gold) bg-(--color-gold)/10 text-(--color-gold)"
                                      : "border-white/15 text-white/75 hover:border-white/30"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {errors.challenge && (
                              <p className="mt-2 text-xs text-red-400">{errors.challenge}</p>
                            )}
                          </div>
                        )}

                        {step === 4 && (
                          <div>
                            <label className="mb-4 block text-sm font-medium text-white/70">
                              {t("fields.budgetLabel")}
                            </label>
                            <div className="grid gap-3">
                              {budgetOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => update("budget", opt)}
                                  className={`flex items-center justify-between rounded-xl border px-5 py-4 text-start text-sm font-medium transition-colors ${
                                    data.budget === opt
                                      ? "border-(--color-gold) bg-(--color-gold)/10 text-(--color-gold)"
                                      : "border-white/15 text-white/75 hover:border-white/30"
                                  }`}
                                >
                                  {opt}
                                  {data.budget === opt && <Check className="h-4 w-4" />}
                                </button>
                              ))}
                            </div>
                            {errors.budget && (
                              <p className="mt-2 text-xs text-red-400">{errors.budget}</p>
                            )}
                          </div>
                        )}

                        {step === 5 && (
                          <div>
                            <label className="mb-2 block text-sm font-medium text-white/70">
                              {t("fields.descriptionLabel")}
                            </label>
                            <textarea
                              rows={7}
                              value={data.description}
                              onChange={(e) => update("description", e.target.value)}
                              placeholder={t("fields.descriptionPlaceholder")}
                              className={`${inputClass} resize-none ${errors.description ? "border-red-400/60" : "border-white/15"}`}
                            />
                            {errors.description && (
                              <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>
                            )}
                          </div>
                        )}

                        {step === 6 && (
                          <div>
                            <CalendlyEmbed
                              value={data.booking}
                              onChange={(slot) => {
                                setData((d) => ({ ...d, booking: slot }));
                                setErrors((e) => ({ ...e, date: undefined, time: undefined }));
                              }}
                            />
                            {(errors.date || errors.time) && (
                              <p className="mt-2 text-xs text-red-400">{t("errors.required")}</p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {errors.submit && (
                      <div className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4">
                        <p className="text-sm text-red-400">{errors.submit}</p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={step === 1}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 disabled:opacity-0"
                      >
                        <BackArrow className="h-4 w-4" />
                        {t("buttons.back")}
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-full bg-(--color-gold) px-7 py-3 text-sm font-semibold text-(--color-navy) shadow-md shadow-(--color-gold)/20 transition-all hover:bg-(--color-gold-light) disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {step === TOTAL_STEPS
                          ? isSubmitting
                            ? t("buttons.submitting") || "Submitting..."
                            : t("buttons.submit")
                          : t("buttons.next")}
                        <Arrow className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
