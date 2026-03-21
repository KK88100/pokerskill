import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { locales, localeNames, type Locale } from '../../lib/i18n/config'
import GeoBanner from '../../components/geo/GeoBanner'
import SchemaOrg from '../../components/seo/SchemaOrg'
import '../globals.css'




export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale
  const isZh = locale === 'zh'

  return {
    metadataBase: new URL('https://pokerskill.io'),
    title: {
      default: isZh ? 'PokerSkill.io | 专业扑克技能学习平台' : 'PokerSkill.io | Professional Poker Skills Training',
      template: isZh ? '%s | PokerSkill.io' : '%s | PokerSkill.io',
    },
    description: isZh
      ? '系统学习德州扑克策略，从基础到高级 GTO，加入专业 Telegram 社群，持续提升胜率。'
      : 'Learn Texas Hold\'em strategy systematically — from fundamentals to advanced GTO. Join our Telegram community and keep improving your win rate.',
    keywords: isZh
      ? ['扑克', '德州扑克', '扑克策略', 'GTO', '扑克学习', '扑克技巧', '在线扑克', '扑克教学']
      : ['poker', 'texas holdem', 'poker strategy', 'GTO', 'poker training', 'poker skills', 'online poker'],
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      alternateLocale: isZh ? 'en_US' : 'zh_CN',
      siteName: 'PokerSkill.io',
      url: `https://pokerskill.io/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@pokerskillio',
    },
    alternates: {
      canonical: `https://pokerskill.io/${locale}`,
      languages: {
        'zh-CN': 'https://pokerskill.io/zh',
        'en-US': 'https://pokerskill.io/en',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

// ── Navigation ──────────────────────────────────────────────────────────────

function NavBar({ locale, messages }: { locale: Locale; messages: Record<string, unknown> }) {
  const nav = (messages as { nav: Record<string, string> }).nav
  const otherLocale = locale === 'zh' ? 'en' : 'zh'

  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">♠</span>
            <span className="font-display font-bold text-lg text-white group-hover:text-gold-500 transition-colors">
              PokerSkill<span className="text-gold-500">.io</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: `/${locale}`, label: nav.home },
              { href: `/${locale}/learn`, label: nav.learn },
              { href: `/${locale}/courses`, label: nav.courses },
              { href: `/${locale}/join`, label: nav.join },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={`/${otherLocale}`}
              className="text-sm text-white/60 hover:text-white/90 transition-colors px-2 py-1 rounded border border-white/20 hover:border-white/40"
            >
              {localeNames[otherLocale]}
            </Link>

            {/* Telegram CTA */}
            <a
              href="https://t.me/dzdf88"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm px-4 py-2 rounded-xl shadow-gold hover:shadow-gold-lg transition-all"
            >
              <span>📱</span>
              {nav.joinTelegram}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────

function Footer({ locale, messages }: { locale: Locale; messages: Record<string, unknown> }) {
  const f = (messages as { footer: Record<string, unknown> }).footer as {
    desc: string
    copyright: string
    disclaimer: string
    links: { title: string; home: string; learn: string; courses: string; join: string }
    contact: { title: string; telegram: string; email: string }
    legal: { title: string; privacy: string; terms: string }
  }

  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-3">
              <span className="text-2xl">♠</span>
              <span className="font-display font-bold text-lg text-white">
                PokerSkill<span className="text-gold-500">.io</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">{f.links.title}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { href: `/${locale}`, label: f.links.home },
                { href: `/${locale}/learn`, label: f.links.learn },
                { href: `/${locale}/courses`, label: f.links.courses },
                { href: `/${locale}/join`, label: f.links.join },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">{f.contact.title}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="https://t.me/dzdf88" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  📱 {f.contact.telegram}
                </a>
              </li>
              <li>
                <a href="mailto:hello@pokerskill.io" className="hover:text-white transition-colors">
                  ✉️ {f.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">{f.legal.title}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{f.legal.privacy}</Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{f.legal.terms}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>{f.copyright}</p>
          <p className="text-center sm:text-right">{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}

// ── Root Layout ──────────────────────────────────────────────────────────────

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className="">
      <head>
        <SchemaOrg
          type="Organization"
          name="PokerSkill.io"
          url="https://pokerskill.io"
          logo="https://pokerskill.io/logo.png"
          description="Professional poker skills learning platform"
          sameAs={['https://t.me/dzdf88']}
        />
        <SchemaOrg
          type="WebSite"
          name="PokerSkill.io"
          url="https://pokerskill.io"
          inLanguage={['zh-CN', 'en-US']}
        />
      </head>
      <body className="bg-navy-950 text-white antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <GeoBanner currentLocale={locale} />
          <NavBar locale={locale as Locale} messages={messages as Record<string, unknown>} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} messages={messages as Record<string, unknown>} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
