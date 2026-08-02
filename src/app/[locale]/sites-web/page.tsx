import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Logo from "@/components/Logo";
import WebsiteFunnel from "@/components/funnel/WebsiteFunnel";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webService" });

  return {
    title: `${t("title")} | Client Factory`,
    description: t("subtitle"),
  };
}

export default async function SitesWebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-(--color-navy-light) via-(--color-navy) to-(--color-navy-dark)" />
      <div className="animate-float-glow absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-(--color-gold)/10 blur-[120px]" />
      <div
        className="animate-float-glow absolute bottom-0 end-0 h-[28rem] w-[28rem] rounded-full bg-(--color-gold)/5 blur-[140px]"
        style={{ animationDelay: "2s" }}
      />

      <div aria-label="Client Factory" className="relative z-10 mb-10">
        <Logo />
      </div>

      <WebsiteFunnel />

      <p className="relative z-10 mt-10 text-center text-xs text-white/35">{t("rights")}</p>
      <p className="relative z-10 mx-auto mt-2 max-w-md text-center text-[11px] leading-relaxed text-white/20">
        This site is not a part of, or endorsed by, Facebook/Meta or Google in any way. FACEBOOK
        is a trademark of Meta Platforms, Inc. GOOGLE is a trademark of Google LLC.
      </p>
    </div>
  );
}
