"use client"

import { useState, useCallback } from "react"
import { ImageIcon, X, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useLanguage } from "@/components/language-provider"

export function GallerySection() {
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" })

  const galleryItems = [
    { id: 1, label: "", src: "8038.webp", type: "image" },
    { id: 2, label: "", src: "8039.webp", type: "image" },
    { id: 3, label: "", src: "8040.webp", type: "image" },
    { id: 4, label: "", src: "8041.webp", type: "image" },
    { id: 5, label: "", src: "8042.webp", type: "image" },
    { id: 7, label: "", src: "p2.png", type: "image" },
    { id: 8, label: "", src: "p2_2.png", type: "image" },
    { id: 6, label: t('gallery.demo'), src: "demonstracao.mp4", type: "video" },
  ]

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const hasMoreThan8 = galleryItems.length > 8

  return (
    <section id="gallery" className="relative overflow-hidden bg-card py-16">
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
            {t('gallery.title')}
          </h2>
          <div className="flex items-end">
            <p className="text-lg font-bold text-foreground">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>

        {/* Gallery grid or carousel */}
        {hasMoreThan8 ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="-ml-3 flex touch-pan-y md:-ml-4">
                {Array.from({ length: Math.ceil(galleryItems.length / 2) }).map((_, colIndex) => (
                  <div key={colIndex} className="min-w-0 flex-[0_0_50%] pl-3 md:flex-[0_0_25%] md:pl-4 flex flex-col gap-3 md:gap-4">
                    {galleryItems.slice(colIndex * 2, colIndex * 2 + 2).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLightbox(item.id)}
                        className="group relative w-full overflow-hidden border-2 border-primary/20 bg-secondary transition-all duration-300 hover:border-primary hover:shadow-lg focus:outline-none"
                      >
                        {/* Top accent */}
                        <div className="h-1 w-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="relative aspect-[4/3]">
                          {item.src ? (
                            item.type === "video" ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-black">
                                <video src={item.src} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                                <PlayCircle className="relative z-10 h-12 w-12 text-white opacity-80 transition-opacity group-hover:opacity-100" />
                              </div>
                            ) : (
                              <img src={item.src} alt={item.label} className="absolute inset-0 h-full w-full object-contain" />
                            )
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
                              <ImageIcon className="h-8 w-8 opacity-30 transition-opacity group-hover:opacity-60" />
                              <span className="text-[10px] font-medium">{item.size}</span>
                              <span className="px-2 text-center text-[9px] font-bold uppercase tracking-wider opacity-50">
                                {item.label}
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* PREV / NEXT buttons */}
            <button
              onClick={scrollPrev}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 border border-border bg-card px-2 py-5 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary md:-left-6 md:px-3 md:py-6"
              aria-label="Previous slide"
            >
              <ChevronLeft className="mx-auto mb-1 h-4 w-4" />
              <span className="hidden md:block">{t('hero.prev')}</span>
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 border border-border bg-card px-2 py-5 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary md:-right-6 md:px-3 md:py-6"
              aria-label="Next slide"
            >
              <ChevronRight className="mx-auto mb-1 h-4 w-4" />
              <span className="hidden md:block">{t('hero.next')}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item.id)}
                className="group relative overflow-hidden border-2 border-primary/20 bg-secondary transition-all duration-300 hover:border-primary hover:shadow-lg focus:outline-none"
              >
                {/* Top accent */}
                <div className="h-1 w-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative aspect-[4/3]">
                  {item.src ? (
                    item.type === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <video src={item.src} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                        <PlayCircle className="relative z-10 h-12 w-12 text-white opacity-80 transition-opacity group-hover:opacity-100" />
                      </div>
                    ) : (
                      <img src={item.src} alt={item.label} className="absolute inset-0 h-full w-full object-contain" />
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
                      <ImageIcon className="h-8 w-8 opacity-30 transition-opacity group-hover:opacity-60" />
                      <span className="text-[10px] font-medium">{item.size}</span>
                      <span className="px-2 text-center text-[9px] font-bold uppercase tracking-wider opacity-50">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-4xl border-2 border-primary bg-card" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 w-full bg-primary" />
            <div className="relative aspect-video bg-secondary">
              {galleryItems.find((g) => g.id === lightbox)?.src ? (
                galleryItems.find((g) => g.id === lightbox)?.type === "video" ? (
                  <video 
                    src={galleryItems.find((g) => g.id === lightbox)?.src} 
                    controls 
                    autoPlay 
                    className="absolute inset-0 h-full w-full object-contain bg-black" 
                  />
                ) : (
                  <img 
                    src={galleryItems.find((g) => g.id === lightbox)?.src} 
                    alt={galleryItems.find((g) => g.id === lightbox)?.label} 
                    className="absolute inset-0 h-full w-full object-contain" 
                  />
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <ImageIcon className="h-16 w-16 opacity-30" />
                  <span className="text-sm font-bold">
                    {galleryItems.find((g) => g.id === lightbox)?.label}
                  </span>
                  <span className="text-xs opacity-60">Replace with your image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
