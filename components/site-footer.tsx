"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "Discord", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Itch.io", href: "#" },
]

export function SiteFooter() {
  const { t } = useLanguage()

  const footerLinks = [
    { label: t('footer.press'), href: "#" },
    { label: t('footer.privacy'), href: "#" },
    { label: t('footer.contact'), href: "/#contact" },
  ]

  return (
    <footer className="border-t-2 border-primary bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary">
                {/* Replace src with your actual logo path in the public folder */}
                <Image 
                  src="flor.jpg" 
                  alt="Synkro Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-black uppercase tracking-tight text-foreground">
                Synkro
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('footer.desc')}
            </p>
          </div>

          {/* Social links */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {t('footer.community')}
            </h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {t('footer.links')}
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
