import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "./SocialIcons";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const links = [
    { href: "#hero", label: tNav("home") },
    { href: "#method", label: tNav("process") },
    { href: "#why", label: tNav("services") },
    { href: "#cases", label: tNav("about") },
    { href: "#contact", label: tNav("contact") },
  ];

  const socialLinks = [
    { href: "https://wa.me/212680824442", icon: WhatsappIcon },
    { href: "https://www.facebook.com/ClientFactoryOfficial/", icon: FacebookIcon },
    { href: "https://www.instagram.com/clientfactoryofficial/", icon: InstagramIcon },
    { href: "https://www.linkedin.com/company/clientfactory", icon: LinkedinIcon },
  ];

  return (
    <footer className="border-t border-white/10 bg-(--color-navy-dark)">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{t("tagline")}</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <SocialLink key={link.href} href={link.href} icon={link.icon} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-(--color-gold)">
              {t("contactTitle")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-(--color-gold)" />
               <a href="tel:+212680824442" dir="ltr" className="hover:text-white">
                  +212 6 80 82 44 42
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-(--color-gold)" />
                <a href="mailto:contact@clientfactory.ma" className="hover:text-white">
                  contact@clientfactory.ma
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-(--color-gold)" />
                <span>{t("address")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-(--color-gold)">
              {t("linksTitle")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-(--color-gold)">
              {t("followTitle")}
            </h3>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
             {t("tagline")}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: typeof FacebookIcon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-(--color-gold) hover:text-(--color-gold)"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
