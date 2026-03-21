import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: `PokerSkill.io | ${t('title')} ${t('titleHighlight')}`,
    description: t('subtitle'),
  }
}

const features = [
  { icon: '📚', key: 'strategy' as const, color: '#3b82f6' },
  { icon: '👥', key: 'community' as const, color: '#8b5cf6' },
  { icon: '🎬', key: 'video' as const, color: '#f59e0b' },
  { icon: '📈', key: 'progress' as const, color: '#10b981' },
  { icon: '📡', key: 'live' as const, color: '#ef4444' },
  { icon: '🏆', key: 'certificate' as const, color: '#d4af37' },
]

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 40%, #1a4731 100%)',
        padding: '72px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)',
            color: '#f0d060', fontSize: 12, fontWeight: 600, padding: '5px 14px',
            borderRadius: 999, marginBottom: 28, letterSpacing: '0.5px',
          }}>
            ⚡ {t('hero.badge')}
          </div>

          <h1 style={{
            fontSize: 'clamp(34px, 7vw, 60px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.15, marginBottom: 20, fontFamily: 'Georgia, serif',
          }}>
            {t('hero.title')}{' '}
            <span style={{
              color: '#d4af37',
              textShadow: '0 0 40px rgba(212,175,55,0.5)',
            }}>
              {t('hero.titleHighlight')}
            </span>
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 56 }}>
            <Link href={`/${locale}/courses`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #d4af37, #f0d060)',
              color: '#1a1a1a', fontWeight: 700, fontSize: 15,
              padding: '13px 28px', borderRadius: 10,
              boxShadow: '0 4px 20px rgba(212,175,55,0.45)',
              textDecoration: 'none',
            }}>
              🚀 {t('hero.cta')}
            </Link>
            <a href="https://t.me/dzdf88" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff', fontWeight: 600, fontSize: 15,
              padding: '13px 28px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
            }}>
              📱 {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
            maxWidth: 380, margin: '0 auto',
          }}>
            {[
              { value: '12,000+', label: t('hero.stats.students') },
              { value: '30+', label: t('hero.stats.courses') },
              { value: '↑35%', label: t('hero.stats.winRate') },
              { value: '10,000+', label: t('hero.stats.community') },
            ].map((s) => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '16px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#d4af37', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800,
              color: '#0f172a', marginBottom: 12, fontFamily: 'Georgia, serif',
            }}>
              {t('features.title')}
            </h2>
            <p style={{ color: '#64748b', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              {t('features.subtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {features.map(({ icon, key, color }) => (
              <div key={key} style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 16, padding: '28px 24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 16,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 8 }}>
                  {t(`features.items.${key}.title`)}
                </h3>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.65 }}>
                  {t(`features.items.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
      <section style={{ padding: '16px 20px 72px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} style={{ color: '#d4af37', fontSize: 20 }}>{s}</span>
            ))}
            <span style={{ marginLeft: 8, color: '#64748b', fontSize: 14, alignSelf: 'center' }}>12,000+ 学员好评</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { text: t('join.testimonials.t1.text'), author: t('join.testimonials.t1.author'), role: t('join.testimonials.t1.role') },
              { text: t('join.testimonials.t2.text'), author: t('join.testimonials.t2.author'), role: t('join.testimonials.t2.role') },
              { text: t('join.testimonials.t3.text'), author: t('join.testimonials.t3.author'), role: t('join.testimonials.t3.role') },
            ].map((r) => (
              <div key={r.author} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
                padding: '24px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <p style={{ color: '#334155', fontSize: 13, lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e3a5f, #1a4731)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#d4af37', fontWeight: 700, fontSize: 14,
                  }}>
                    {r.author[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{r.author}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 40%, #1a4731 100%)',
        padding: '72px 20px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff',
            marginBottom: 14, fontFamily: 'Georgia, serif',
          }}>
            {t('cta.title')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>
            {t('cta.subtitle')}
          </p>
          <a href="https://t.me/dzdf88" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #d4af37, #f0d060)',
            color: '#1a1a1a', fontWeight: 700, fontSize: 17,
            padding: '16px 40px', borderRadius: 14,
            boxShadow: '0 6px 28px rgba(212,175,55,0.5)',
            textDecoration: 'none',
          }}>
            📱 {t('cta.button')}
          </a>
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t('cta.note')}</p>
        </div>
      </section>

    </div>
  )
}
