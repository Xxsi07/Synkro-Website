"use client"

import { ImageIcon } from "lucide-react"
import { Gamepad2, Users, Calendar, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const aboutImage = {
  src: "flor.jpg", // Add your image URL here
}

export function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    { icon: Calendar, label: t('about.dev'), value: t('about.since') },
    { icon: Users, label: t('about.team'), value: "Rafael Pereira, Francisco Almeida and Eduardo Souza" },
    { icon: Zap, label: t('about.engine'), value: "Unreal Engine 5" },
    { icon: Gamepad2, label: t('about.genre'), value: t('about.fighting') },
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-card py-16">
      {/* Diagonal stripe pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 10px, #a855f7 10px, #a855f7 11px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 grid grid-cols-1 gap-6 border-b-2 border-border pb-6 md:grid-cols-2">
          <h2
            className="text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            {t('about.title')}
          </h2>
          <div className="flex items-end">
            <p className="text-lg font-bold text-foreground">
              {t('about.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Image placeholder */}
          <div className="overflow-hidden border-2 border-primary bg-secondary flex flex-col h-full">
            <div className="h-1.5 w-full bg-primary shrink-0" />
            <div className="relative flex-1 w-full flex items-center justify-center bg-black min-h-[300px]">
              {aboutImage.src ? (
                <img src={aboutImage.src} alt={aboutImage.alt} className="absolute inset-0 h-full w-full object-contain p-8" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <ImageIcon className="h-16 w-16 opacity-40" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <h3
              className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              Synkro
            </h3>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              {t('about.desc')}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-2 border-primary/20 bg-background p-4 transition-colors hover:border-primary"
                >
                  <stat.icon className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
