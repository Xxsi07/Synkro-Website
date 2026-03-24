"use client"

import { ImageIcon, Download, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { WarpBackground } from "@/components/warp-background"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PrototypesSection() {
  const { t } = useLanguage()

  const prototypes = [
    {
      id: 1,
      version: "v0.2 Prototype",
      title: t('proto2.demo.title'),
      description: t('proto2.demo.desc'),
      details: t('proto2.demo.details'),
      status: t('proto2.status'),
      statusColor: "bg-accent text-accent-foreground",
      src: "Menu.jpg",
      downloadLink: "/Synkro-Prototypev0.2.zip",
    },
    {
      id: 2,
      version: "v0.1 Prototype",
      title: t('proto.demo.title'),
      description: t('proto.demo.desc'),
      details: t('proto.demo.details'),
      status: t('proto.status'),
      statusColor: "bg-accent text-accent-foreground",
      src: "Prototipo.jpg",
      downloadLink: "/Synkro-Prototypev0.1.zip",
    },
  ]

  return (
    <section id="demos" className="relative overflow-hidden bg-background py-16">
      <WarpBackground />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 grid grid-cols-1 gap-6 border-b-2 border-border pb-6 md:grid-cols-2">
          <h2
            className="text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            {t('proto.title')}
          </h2>
          <div className="flex items-end">
            <p className="text-lg font-bold text-foreground">
              {t('proto.subtitle')}
            </p>
          </div>
        </div>

        {/* Prototype cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {prototypes.map((proto) => (
            <article
              key={proto.id}
              className="group overflow-hidden border-2 border-primary/30 bg-card transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              {/* Status badge */}
              <div className="relative">
                <div className="absolute left-0 top-0 z-10">
                  <span
                    className={`inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${proto.statusColor}`}
                  >
                    {proto.status}
                  </span>
                </div>

                {/* Image placeholder */}
                <div className="relative aspect-video bg-secondary">
                  {proto.src ? (
                    <img src={proto.src} alt={proto.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-10 w-10 opacity-30" />
                    </div>
                  )}
                </div>

                {/* Gold accent */}
                <div className="h-1 w-full bg-primary" />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="inline-block bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                  {proto.version}
                </span>
                <h3 className="mt-2 text-base font-bold text-foreground">{proto.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proto.description}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={proto.downloadLink}
                    download
                    className="flex items-center gap-2 bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {t('proto.download')}
                  </a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t('proto.details')}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{proto.title} - {proto.version}</DialogTitle>
                        <DialogDescription>
                          {proto.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {proto.details || "More details about this version will be added soon."}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
