"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'pt'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'HOME',
    'nav.gallery': 'GALLERY',
    'nav.demos': 'DOWNLOADS',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    'nav.official': 'OFFICIAL SITE',
    'nav.play': 'Play Demo',
    
    // Hero
    'hero.featured': 'Featured',
    'hero.coming': 'Coming Soon',
    'hero.announcement': 'previous announcement',
    'hero.released': 'v0.1 Prototype released',
    'hero.features': 'basic movement, jumping, light punch and heavy punch.',
    'hero.prev': 'Prev',
    'hero.next': 'Next',
    'hero.menu': 'Announcement',
    'hero.menu.title': 'v0.2 Prototype released',
    'hero.menu.subtitle': 'MainMenu, Character Selection, Basic Attacks, Basic Movement.',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Screenshots & concept art',
    'gallery.demo': 'Demonstration',
    
    // Prototypes
    'proto.title': 'Downloads',
    'proto.subtitle': 'Playable builds & demos',
    'proto.status': 'Available ',
    'proto.demo.title': 'Movement Demonstration',
    'proto.demo.desc': 'Basic sets of prototype character movements.',
    'proto.demo.details': 'Version 0.1 includes basic movement, jumping, light punch and heavy punch.',
    'proto.download': 'Download',
    'proto.details': 'Details',

    'proto2.status': 'Available Now',
    'proto2.demo.title': 'Menus & Basic Attacks Demonstration',
    'proto2.demo.desc': 'MainMenu, Character Selection, Basic Attacks, Basic Movement',
    'proto2.demo.details': 'Version 0.2 includes MainMenu, Character Selection, Basic Attacks, and Basic Movement.',
    'proto2.download': 'Download',
    'proto2.details': 'Details',

    
    // About
    'about.title': 'About',
    'about.subtitle': 'About the game & the team',
    'about.desc': 'Synkro is a 2.5D fighting game that involves whoever defeats their opponent first. This game has different features than normal fighting games, such as a body hitbox system that can leave the player with limited movement depending on where they are hit and this game also has a class system where each character has their own class and respective attributes.',
    'about.dev': 'In Development',
    'about.since': 'Since 2025',
    'about.team': 'Team Size',
    'about.engine': 'Engine',
    'about.genre': 'Genre',
    'about.fighting': '2.5D Fighting Game',
    
    // Footer
    'footer.desc': 'Follow the development journey. Synkro is currently in active development.',
    'footer.community': 'Community',
    'footer.links': 'Links',
    'footer.press': 'Press Kit',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.rights': 'Game Studio. All rights reserved. Game is currently in development.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.desc': 'Have a question or want to work together? Reach out to us through the following channels.',
    'contact.email': 'Email Support',
    'contact.email.desc': 'Send us an email and we\'ll get back to you as soon as possible.',
    'contact.email.address': 'synkrosuport@gmail.com',
    'contact.phone': 'Phone Support',
    'contact.phone.desc': 'Call us directly for immediate assistance.',
    'contact.phone.number': '+111 (555) 123-4567'
  },
  pt: {
    // Navbar
    'nav.home': 'INÍCIO',
    'nav.gallery': 'GALERIA',
    'nav.demos': 'INSTALAÇÕES',
    'nav.about': 'SOBRE',
    'nav.contact': 'CONTATO',
    'nav.official': 'Site Oficial',
    'nav.play': 'Jogar Demo',
    
    // Hero
    'hero.featured': 'Destaque',
    'hero.coming': 'Em Breve',
    'hero.announcement': 'Anúncio',
    'hero.released': 'Protótipo v0.1 lançado',
    'hero.features': 'Novos Recursos Revelados',
    'hero.prev': 'Ant',
    'hero.next': 'Próx',
    
    // Gallery
    'gallery.title': 'Galeria',
    'gallery.subtitle': 'Capturas de tela e arte conceitual',
    'gallery.demo': 'Demonstração',
    
    // Prototypes
    'proto.title': 'instalações',
    'proto.subtitle': 'Versões jogáveis e demos',
    'proto.status': 'Disponível ',
    'proto.demo.title': 'Demonstração de Movimento',
    'proto.demo.desc': 'Conjuntos básicos de movimentos de personagens do protótipo.',
    'proto.demo.details': 'A versão 0.1 inclui movimentos básicos, mecânica de pulo, soco leve e soco pesado.',
    'proto.download': 'Baixar',
    'proto.details': 'Detalhes',

    'proto2.status': 'Disponível Agora',
    'proto2.demo.title': 'Demonstração de Menus e Ataques Básicos',
    'proto2.demo.desc': 'Menus principais, seleção de personagens, ataques básicos e movimentos básicos.',
    'proto2.demo.details': 'A versão 0.2 inclui Menu Principal, Seleção de Personagens, Ataques Básicos e Movimentos Básicos.',
    'proto2.download': 'Baixar',
    'proto2.details': 'Detalhes',
    
    // About
    'about.title': 'Sobre',
    'about.subtitle': 'Sobre o jogo e a equipe',
    'about.desc': 'Synkro é um jogo de luta 2.5D que envolve quem derrota seu oponente primeiro. Este jogo tem características diferentes dos jogos de luta normais, como um sistema de hitbox corporal que pode deixar o jogador com movimento limitado dependendo de onde é atingido e este jogo também tem um sistema de classes onde cada personagem tem sua própria classe e respectivos atributos.',
    'about.dev': 'Em Desenvolvimento',
    'about.since': 'Desde 2025',
    'about.team': 'Tamanho da Equipe',
    'about.engine': 'Motor Gráfico',
    'about.genre': 'Gênero',
    'about.fighting': 'Jogo de Luta 2.5D',
    
    // Footer
    'footer.desc': 'Acompanhe a jornada de desenvolvimento. Synkro está atualmente em desenvolvimento ativo.',
    'footer.community': 'Comunidade',
    'footer.links': 'Links',
    'footer.press': 'Kit de Imprensa',
    'footer.privacy': 'Política de Privacidade',
    'footer.contact': 'Contato',
    'footer.rights': 'Game Studio. Todos os direitos reservados. O jogo está atualmente em desenvolvimento.',
    
    // Contact
    'contact.title': 'Contate-nos',
    'contact.desc': 'Tem alguma dúvida ou quer trabalhar conosco? Entre em contato através dos seguintes canais.',
    'contact.email': 'Suporte por E-mail',
    'contact.email.desc': 'Envie-nos um e-mail e entraremos em contato o mais breve possível.',
    'contact.email.address': 'synkrosuport@gmail.com',
    'contact.phone': 'Suporte por Telefone',
    'contact.phone.desc': 'Ligue diretamente para nós para assistência imediata.',
    'contact.phone.number': '+55 (11) 91234-5678'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setLanguage(savedLang)
    }
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  // Render children immediately to avoid hydration mismatch, but use default language
  // until mounted
  return (
    <LanguageContext.Provider value={{ language: mounted ? language : 'en', setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
