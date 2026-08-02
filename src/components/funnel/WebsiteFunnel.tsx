"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Calendar,
  Clock3,
  Mail,
  CalendarPlus,
} from "lucide-react";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxHV8PdPtiPl8B7TleWuSGEifuCoy-P34Rw9lfB9WiTW4blbQq2Y3hhjqGEVO_U6ldF0A/exec";

const WISTIA_STEP1_MEDIA_ID = "pur57rk2lj";
const WISTIA_STEP2_MEDIA_ID = "d600t6xojw";
const VIDEO_UNLOCK_THRESHOLD = 90;
const DAYS_AHEAD = 14;
const TIME_SLOT_HOURS = [9, 10, 11, 14, 15, 16];

const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  ar: "ar-MA",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{6,}$/;

type LeadData = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
};

const INITIAL_LEAD: LeadData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
};

function getUpcomingDates(): Date[] {
  const dates: Date[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + 1);
  for (let i = 0; dates.length < DAYS_AHEAD; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() === 0) continue;
    dates.push(d);
  }
  return dates;
}

export default function WebsiteFunnel() {
  const t = useTranslations("webFunnel");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const intlLocale = INTL_LOCALES[locale] ?? "fr-FR";

  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<LeadData>(INITIAL_LEAD);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const [videoProgress, setVideoProgress] = useState(0);

  const dates = useMemo(() => getUpcomingDates(), []);
  const [dateIndex, setDateIndex] = useState<number | null>(null);
  const [timeHour, setTimeHour] = useState<number | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const attachStep2Video = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    el.addEventListener("percent-watched-change", ((e: CustomEvent<{ percentWatched: number }>) => {
      setVideoProgress((prev) => Math.max(prev, Math.round(e.detail.percentWatched * 100)));
    }) as EventListener);
  }, []);

  function updateLead<K extends keyof LeadData>(key: K, value: LeadData[K]) {
    setLead((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateLead(): boolean {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    if (!lead.fullName.trim()) newErrors.fullName = t("errors.required");
    if (!lead.email.trim()) newErrors.email = t("errors.required");
    else if (!EMAIL_REGEX.test(lead.email)) newErrors.email = t("errors.invalidEmail");
    if (!lead.phone.trim()) newErrors.phone = t("errors.required");
    else if (!PHONE_REGEX.test(lead.phone)) newErrors.phone = t("errors.invalidPhone");
    if (!lead.companyName.trim()) newErrors.companyName = t("errors.required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLeadSubmit() {
    if (!validateLead()) return;
    setIsSubmittingLead(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "sites-web-funnel",
          stage: "lead-captured",
          ...lead,
        }),
      });
    } catch (error) {
      console.error("Lead submission error:", error);
    } finally {
      setIsSubmittingLead(false);
      setStep(2);
    }
  }

  async function handleConfirmBooking() {
    if (dateIndex === null || timeHour === null) return;
    setIsConfirming(true);
    const selectedDate = dates[dateIndex];
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "sites-web-funnel",
          stage: "booking-confirmed",
          ...lead,
          booking: {
            date: selectedDate.toISOString().split("T")[0],
            time: `${String(timeHour).padStart(2, "0")}:00`,
            timezone: "Africa/Casablanca",
          },
        }),
      });
    } catch (error) {
      console.error("Booking submission error:", error);
    } finally {
      setIsConfirming(false);
      setStep(4);
    }
  }

  const inputClass =
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-(--color-gold)";

  const videoUnlocked = videoProgress >= VIDEO_UNLOCK_THRESHOLD;
  const cardWidth = step === 3 ? "max-w-3xl" : "max-w-lg";

  return (
    <div className={`relative z-10 w-full ${cardWidth}`}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_STEP1_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_STEP2_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <div>
                <span className="inline-flex items-center rounded-full bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
                  {t("step1.badge")}
                </span>
                <h1 className="font-display mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {t("step1.title")}
                </h1>
                <p className="mt-3 text-sm text-white/60 sm:text-base">{t("step1.tagline")}</p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <wistia-player media-id={WISTIA_STEP1_MEDIA_ID} aspect={16 / 9} />
                </div>

                <p className="mt-3 text-center text-xs text-white/40">{t("step1.videoNote")}</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <input
                      value={lead.fullName}
                      onChange={(e) => updateLead("fullName", e.target.value)}
                      placeholder={t("step1.fields.fullName")}
                      className={`${inputClass} ${errors.fullName ? "border-red-400/60" : "border-white/15"}`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={lead.email}
                      onChange={(e) => updateLead("email", e.target.value)}
                      placeholder={t("step1.fields.email")}
                      className={`${inputClass} ${errors.email ? "border-red-400/60" : "border-white/15"}`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      dir="ltr"
                      value={lead.phone}
                      onChange={(e) => updateLead("phone", e.target.value)}
                      placeholder={t("step1.fields.phone")}
                      className={`${inputClass} ${isRtl ? "text-right" : "text-left"} ${errors.phone ? "border-red-400/60" : "border-white/15"}`}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      value={lead.companyName}
                      onChange={(e) => updateLead("companyName", e.target.value)}
                      placeholder={t("step1.fields.companyName")}
                      className={`${inputClass} ${errors.companyName ? "border-red-400/60" : "border-white/15"}`}
                    />
                    {errors.companyName && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLeadSubmit}
                  disabled={isSubmittingLead}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-gold) px-7 py-4 text-sm font-semibold text-(--color-navy) shadow-lg shadow-(--color-gold)/25 transition-all hover:bg-(--color-gold-light) disabled:opacity-60"
                >
                  {t("step1.submit")}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>

                <p className="mt-5 text-center text-xs text-white/35">{t("step1.footerNote")}</p>
              </div>
            )}

            {step === 2 && (
              <div>
                <span className="inline-flex items-center rounded-full bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
                  {t("step2.badge")}
                </span>
                <h1 className="font-display mt-5 text-xl font-bold leading-tight text-white sm:text-2xl">
                  {t("step2.title")}
                </h1>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <wistia-player ref={attachStep2Video} media-id={WISTIA_STEP2_MEDIA_ID} aspect={16 / 9} />
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-(--color-gold)">
                    <span>{t("step2.watching")}</span>
                    <span>{videoProgress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-(--color-gold) to-(--color-gold-light) transition-[width] duration-300"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>

                {!videoUnlocked && (
                  <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                    <Lock className="h-3.5 w-3.5" />
                    {t("step2.locked")}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => videoUnlocked && setStep(3)}
                  disabled={!videoUnlocked}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all ${
                    videoUnlocked
                      ? "bg-(--color-gold) text-(--color-navy) shadow-lg shadow-(--color-gold)/25 hover:bg-(--color-gold-light)"
                      : "cursor-not-allowed bg-(--color-gold)/40 text-(--color-navy)/60"
                  }`}
                >
                  {t("step2.cta")}
                  {videoUnlocked ? <Arrow className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
                >
                  <BackArrow className="h-3.5 w-3.5" />
                  {t("back")}
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <span className="inline-flex items-center rounded-full bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
                  {t("step3.badge")}
                </span>
                <h1 className="font-display mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {t("step3.title")}
                </h1>
                <p className="mt-2 text-sm text-white/60">{t("step3.subtitle")}</p>

                <div className="mt-7 grid gap-8 sm:grid-cols-5">
                  <div className="sm:col-span-3">
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                      {dates.map((date, i) => {
                        const isActive = dateIndex === i;
                        const weekday = new Intl.DateTimeFormat(intlLocale, {
                          weekday: "short",
                        }).format(date);
                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => setDateIndex(i)}
                            className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-colors ${
                              isActive
                                ? "border-(--color-gold) bg-(--color-gold)/15"
                                : "border-white/10 bg-white/[0.02] hover:border-white/25"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wide ${
                                isActive ? "text-(--color-gold)" : "text-white/40"
                              }`}
                            >
                              {weekday}
                            </span>
                            <span
                              className={`text-base font-bold ${isActive ? "text-white" : "text-white/80"}`}
                            >
                              {date.getDate()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    {dateIndex === null ? (
                      <p className="flex h-full items-center rounded-xl border border-dashed border-white/15 p-4 text-sm text-white/40">
                        {t("step3.chooseDatePrompt")}
                      </p>
                    ) : (
                      <div>
                        <p className="flex items-center gap-2 text-sm font-medium text-white/70">
                          <Calendar className="h-4 w-4 text-(--color-gold)" />
                          {new Intl.DateTimeFormat(intlLocale, {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(dates[dateIndex])}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {TIME_SLOT_HOURS.map((hour) => {
                            const isActive = timeHour === hour;
                            return (
                              <button
                                key={hour}
                                type="button"
                                onClick={() => setTimeHour(hour)}
                                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                                  isActive
                                    ? "border-(--color-gold) bg-(--color-gold) text-(--color-navy)"
                                    : "border-white/15 text-white/75 hover:border-white/30"
                                }`}
                              >
                                {hour}h-{hour + 1}h
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={dateIndex === null || timeHour === null || isConfirming}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-gold) px-7 py-4 text-sm font-semibold text-(--color-navy) shadow-lg shadow-(--color-gold)/25 transition-all hover:bg-(--color-gold-light) disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Clock3 className="h-4 w-4" />
                  {isConfirming ? t("step3.confirming") : t("step3.confirm")}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
                >
                  <BackArrow className="h-3.5 w-3.5" />
                  {t("back")}
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-gold)/15 text-(--color-gold)">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <span className="mt-5 inline-flex items-center rounded-full bg-(--color-gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-gold)">
                  {t("step4.badge")}
                </span>
                <h1 className="font-display mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {t("step4.title")}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                  {t("step4.message")}
                </p>

                <div className="mt-8 w-full space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-start">
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <Mail className="h-4 w-4 shrink-0 text-(--color-gold)" />
                    {t("step4.notice1")}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CalendarPlus className="h-4 w-4 shrink-0 text-(--color-gold)" />
                    {t("step4.notice2")}
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-(--color-gold)/50 hover:text-white"
                >
                  <BackArrow className="h-4 w-4" />
                  {t("step4.backHome")}
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
