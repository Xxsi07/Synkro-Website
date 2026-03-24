"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    setMounted(true)
    
    // Handle hash changes for active state
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }
    
    // Set initial hash
    handleHashChange()
    
    window.addEventListener('hashchange', handleHashChange)

    // Handle scroll to update active section
    const handleScroll = () => {
      if (pathname !== "/") return; // Only track scroll on home page

      const sections = ['gallery', 'demos', 'about', 'contact'];
      let currentSection = "";

      // Find the section that is currently most visible in the viewport
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          // and the bottom is below the top of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            currentSection = `#${section}`;
          }
        }
      }

      // If we're at the very top of the page, clear the hash
      if (window.scrollY < 100) {
        currentSection = "";
      }

      if (currentSection !== activeHash) {
        setActiveHash(currentSection);
        // Optional: update URL without jumping
        if (currentSection) {
          window.history.replaceState(null, '', currentSection);
        } else {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, activeHash])

  const navLinks = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.gallery'), href: "/#gallery" },
    { label: t('nav.demos'), href: "/#demos" },
    { label: t('nav.about'), href: "/#about" },
    { label: t('nav.contact'), href: "/#contact" },
  ]

  // Helper to determine if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeHash
    }
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.substring(1)
    }
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary">
            {/* Replace src with your actual logo path in the public folder */}
            <Image 
              src="flor.jpg" 
              alt="Synkro Logo" 
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black uppercase tracking-tight text-foreground">
              Synkro
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t('nav.official')}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                if (link.href.startsWith("/#")) {
                  setActiveHash(link.href.substring(1))
                } else if (link.href === "/") {
                  setActiveHash("")
                }
              }}
              className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {mounted && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground font-bold"
                    aria-label="Toggle language"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'EN' : 'PT'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('pt')}>
                    Português
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </>
          )}
          <Button asChild className="hidden bg-primary font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 md:inline-flex">
            <Link href="/#demos">{t('nav.play')}</Link>
          </Button>
          <button
            className="flex h-10 w-10 items-center justify-center text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
                onClick={() => {
                  setMobileOpen(false)
                  if (link.href.startsWith("/#")) {
                    setActiveHash(link.href.substring(1))
                  } else if (link.href === "/") {
                    setActiveHash("")
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full bg-primary font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              <Link 
                href="/#demos"
                onClick={() => {
                  setMobileOpen(false)
                  setActiveHash("demos")
                }}
              >
                {t('nav.play')}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
