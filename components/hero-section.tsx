"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useLanguage } from "@/components/language-provider"
import { WarpBackground } from "@/components/warp-background"

export function HeroSection() {
  const { t } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      id: 1,
      label: t('hero.featured'),
      title: "Synkro",
      subtitle: t('hero.coming'),
      src: "flor.jpg",
    },
    {
      id: 2,
      label: t('hero.announcement'),
      title: t('hero.released'),
      subtitle: t('hero.features'),
      src: "Prototipo.jpg",
    },
    {
      id: 3,
      label: t('hero.menu'),
      title: t('hero.menu.title'),
      subtitle: t('hero.menu.subtitle'),
      src: "menu.jpg",
    },
  ]

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrent(emblaApi.selectedScrollSnap())
  }, [emblaApi, setCurrent])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden bg-background py-6 md:py-10">
      <WarpBackground />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Carousel container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-3 flex touch-pan-y items-center md:-ml-4">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <div
                    key={slide.id}
                    className={`min-w-0 flex-[0_0_100%] pl-3 md:flex-[0_0_52%] md:pl-4`}
                    onClick={() => !isActive && emblaApi?.scrollTo(index)}
                  >
                    <div className={`overflow-hidden border-primary shadow-xl transition-all duration-500 ${isActive ? "scale-100 opacity-100 border-3" : "scale-95 cursor-pointer opacity-60 hover:opacity-80 border-2 border-border"}`}>
                      <div className="h-1.5 w-full bg-primary" />
                      <div className={`relative bg-secondary aspect-[16/10]`}>
                        {slide.src ? (
                          <img 
                            src={slide.src} 
                            alt={slide.title} 
                            className={`absolute inset-0 h-full w-full ${slide.id === 1 ? 'object-contain bg-black p-4' : 'object-cover'}`} 
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <ImageIcon className={`${isActive ? "h-16 w-16" : "h-8 w-8"} opacity-30`} />
                            {isActive ? (
                              <>
                              </>
                            ) : (
                              <span className="text-[10px] font-medium">Slide Image</span>
                            )}
                          </div>
                        )}

                        {/* Overlay content */}
                        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-20 md:p-8 md:pt-24 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                          <span className="mb-2 inline-block bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                            {slide.label}
                          </span>
                          <h2
                            className="text-2xl font-black uppercase tracking-tight text-white md:text-5xl"
                            style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.02em" }}
                          >
                            {slide.title}
                          </h2>
                          <p className="mt-1 text-sm font-semibold text-white/70 md:text-base">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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

        {/* Slide indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 transition-all ${i === current
                ? "w-8 bg-primary"
                : "w-4 bg-border hover:bg-muted-foreground"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
