import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '../../components/ui/Button'
import SchemaOrg from '../../components/seo/SchemaOrg'
import {
  BookOpen, Users, Video, TrendingUp, Radio, Award,
  ChevronRight, Star, Zap
} from 'lucide-react'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: `PokerSkill.io | ${t('title')} ${t('titleHighlight')}`,
    description: t('subtitle'),
  }
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-display font-bold text-gold-500 mb-1">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  )
}

// ── Feature card ─────────────────────────────────────────────────────────────
const featureIcons = [BookOpen, Users, Video, TrendingUp, Radio, Award]

function FeatureCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof BookOpen
  title: string
  desc: string
  index: number
}) {
  return (
    <div
      className="group relative bg-navy-900/60 border border-white/10 rounded-2xl p-6
                 hover:border-gold-500/40 hover:shadow-card-hover hover:bg-navy-800/60
                 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
          <Icon className="w-6 h-6 text-gold-500" />
        </div>
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// ── Suit decorations ─────────────────────────────────────────────────────────
function SuitDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <span className="absolute top-20 left-8 text-6xl text-gold-500/5 rotate-12 font-bold">♠</span>
      <span className="absolute top-40 right-12 text-5xl text-gold-500/5 -rotate-6 font-bold">♥</span>
      <span className="absolute bottom-32 left-16 text-7xl text-gold-500/5 rotate-3 font-bold">♣</span>
      <span className="absolute bottom-16 right-8 text-5xl text-gold-500/5 -rotate-12 font-bold">♦</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const featureKeys = ['strategy', 'community', 'video', 'progress', 'live', 'certificate'] as const

  return (
    <>
      <SchemaOrg
        type="WebSite"
        name="PokerSkill.io"
        url={`https://pokerskill.io/${locale}`}
        description={t('hero.subtitle')}
        inLanguage={locale === 'zh' ? 'zh-CN' : 'en-US'}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-dark-gradient px-4 py-20">
        <SuitDecorations />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {t('hero.title')}{' '}
            <span className="text-gold-500 relative">
              {t('hero.titleHighlight')}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M0 4 Q75 0 150 4 Q225 8 300 4" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href={`/${locale}/courses`}>
              <Button variant="gold" size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
                {t('hero.cta')}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              href="https://t.me/dzdf88"
              target="_blank"
              leftIcon={<span>📱</span>}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <StatCard value="12,000+" label={t('hero.stats.students')} />
            <StatCard value="30+" label={t('hero.stats.courses')} />
            <StatCard value="↑35%" label={t('hero.stats.winRate')} />
            <StatCard value="10,000+" label={t('hero.stats.community')} />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((key, i) => (
              <FeatureCard
                key={key}
                icon={featureIcons[i]}
                title={t(`features.items.${key}.title`)}
                desc={t(`features.items.${key}.desc`)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ──────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-navy-900/60 border-y border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
          {['NL50', 'NL100', 'MTT', 'GTO', 'PLO'].map((tag) => (
            <span key={tag} className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gold-500" />
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA section ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-dark-gradient relative overflow-hidden">
        <SuitDecorations />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-white/60 mb-8 text-lg">{t('cta.subtitle')}</p>
          <Button
            variant="gold"
            size="xl"
            href="https://t.me/dzdf88"
            target="_blank"
            fullWidth
            className="max-w-sm mx-auto"
            leftIcon={<span className="text-xl">📱</span>}
          >
            {t('cta.button')}
          </Button>
          <p className="mt-3 text-sm text-white/40">{t('cta.note')}</p>
        </div>
      </section>
    </>
  )
}
