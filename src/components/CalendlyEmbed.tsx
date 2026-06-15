"use client";

import { InlineWidget } from "react-calendly";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Calendar, Clock, Globe2 } from "lucide-react";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

const TIMEZONES = [
  "Africa/Casablanca",
  "Europe/Paris",
  "Europe/London",
  "Asia/Dubai",
  "Asia/Riyadh",
];

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export type BookingSlot = {
  date: string;
  time: string;
  timezone: string;
};

export default function CalendlyEmbed({
  value,
  onChange,
}: {
  value: BookingSlot;
  onChange: (slot: BookingSlot) => void;
}) {
  const t = useTranslations("form.calendar");
  const locale = useLocale();
  const [today] = useState(() => new Date().toISOString().split("T")[0]);

  if (CALENDLY_URL) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: "650px" }}
          pageSettings={{
            backgroundColor: "071b34",
            primaryColor: "d4af37",
            textColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="font-display text-lg font-semibold text-white">{t("title")}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
            <Calendar className="h-4 w-4 text-(--color-gold)" />
            {t("day")}
          </label>
          <input
            type="date"
            min={today}
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
            lang={locale}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-(--color-gold) [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
            <Clock className="h-4 w-4 text-(--color-gold)" />
            {t("time")}
          </label>
          <select
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-(--color-gold) [color-scheme:dark]"
          >
            <option value="" className="bg-(--color-navy)">
              --:--
            </option>
            {TIMES.map((time) => (
              <option key={time} value={time} className="bg-(--color-navy)">
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
            <Globe2 className="h-4 w-4 text-(--color-gold)" />
            {t("timezone")}
          </label>
          <select
            value={value.timezone}
            onChange={(e) => onChange({ ...value, timezone: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-(--color-gold) [color-scheme:dark]"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz} className="bg-(--color-navy)">
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
