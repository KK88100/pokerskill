import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'

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

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const features = [
    { icon: '📚', key: 'strategy' },
    { icon: '👥', key: 'community' },
    { icon: '🎬', key: 'video' },
    { icon: '📈', key: 'progress' },
    { icon: '📡', key: 'live' },
    { icon: '🏆', key: 'certificate' },
  ] as const

  return (
    <div style={{ background: '#060d15', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1b2a 0%, #0a1f14 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative suits */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: '10%', left: '5%', fontSize: 80, color: 'rgba(212,175,55,0.06)', fontWeight: 'bold' }}>♠</span>
          <span style={{ position: 'absolute', top: '30%', right: '5%', fontSize: 60, color: 'rgba(212,175,55,0.06)', fontWeight: 'bold' }}>♥</span>
          <span style={{ position: 'absolute', bottom: '20%', left: '10%', fontSize: 90, color: 'rgba(212,175,55,0.06)', fontWeight: 'bold' }}>♣</span>
          <span style={{ position: 'absolute', bottom: '10%', right: '8%', fontSize: 60, color: 'rgba(212,175,55,0.06)', fontWeight: 'bold' }}>♦</span>
        </div>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.35)',
            color: '#d4af37',
            fontSize: 13,
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: 999,
            marginBottom: 24,
          }}>
            ⚡ {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: 20,
            fontFamily: 'Georgia, serif',
          }}>
            {t('hero.title')}{' '}
            <span style={{ color: '#d4af37' }}>{t('hero.titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 60 }}>
            <Link href={`/${locale}/courses`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#d4af37',
              color: '#060d15',
              fontWeight: 700,
              fontSize: 16,
              padding: '14px 32px',
              borderRadius: 12,
              boxShadow: '0 0 24px rgba(212,175,55,0.4)',
              textDecoration: 'none',
            }}>
              {t('hero.cta')} →
            </Link>
            <a href="https://t.me/dzdf88" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 16,
              padding: '14px 32px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.25)',
              textDecoration: 'none',
            }}>
              📱 {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 500, margin: '0 auto' }}>
            {[
              { value: '12,000+', label: t('hero.stats.students') },
              { value: '30+', label: t('hero.stats.courses') },
              { value: '↑35%', label: t('hero.stats.winRate') },
              { value: '10,000+', label: t('hero.stats.community') },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#d4af37', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 20px', background: '#060d15' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
              {t('features.title')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              {t('features.subtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map(({ icon, key }) => (
              <div key={key} style={{
                background: '#0d1b2a',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: 16,
                padding: '28px 24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginBottom: 16,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: 16, marginBottom: 8 }}>
                  {t(`features.items.${key}.title`)}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6 }}>
                  {t(`features.items.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1b2a 0%, #0a1f14 100%)',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#ffffff', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
            {t('cta.title')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 36 }}>
            {t('cta.subtitle')}
          </p>
          <a href="https://t.me/dzdf88" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#d4af37',
            color: '#060d15',
            fontWeight: 700,
            fontSize: 18,
            padding: '16px 40px',
            borderRadius: 14,
            boxShadow: '0 0 32px rgba(212,175,55,0.45)',
            textDecoration: 'none',
          }}>
            📱 {t('cta.button')}
          </a>
          <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{t('cta.note')}</p>
        </div>
      </section>
    </div>
  )
}
