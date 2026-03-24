"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Mail, Phone, Copy, Check } from "lucide-react"
import { WarpBackground } from "@/components/warp-background"

export function ContactSection() {
  const { t } = useLanguage()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-24">
      <WarpBackground />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="space-y-12">
          <div className="text-center">
            <h2 
              className="text-5xl font-black uppercase tracking-tight text-foreground mb-4 md:text-7xl"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Card */}
            <button 
              onClick={() => copyToClipboard(t('contact.email.address'), 'email')}
              className="group flex flex-col items-center text-center p-8 bg-card rounded-lg border-2 border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary))] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(var(--primary))] cursor-pointer w-full"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">
                {t('contact.email')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.email.desc')}
              </p>
              <div className="flex items-center gap-2 text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-md">
                <span>{t('contact.email.address')}</span>
                {copiedEmail ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </div>
              <span className="text-xs text-muted-foreground mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedEmail ? 'Copied!' : 'Click to copy'}
              </span>
            </button>

            {/* Phone Card */}
            <button 
              onClick={() => copyToClipboard(t('contact.phone.number'), 'phone')}
              className="group flex flex-col items-center text-center p-8 bg-card rounded-lg border-2 border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary))] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(var(--primary))] cursor-pointer w-full"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">
                {t('contact.phone')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.phone.desc')}
              </p>
              <div className="flex items-center gap-2 text-lg font-bold text-primary bg-primary/10 px-4 py-2 rounded-md">
                <span>{t('contact.phone.number')}</span>
                {copiedPhone ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </div>
              <span className="text-xs text-muted-foreground mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedPhone ? 'Copied!' : 'Click to copy'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
