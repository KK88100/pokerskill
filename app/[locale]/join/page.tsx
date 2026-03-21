'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const benefits = [
  {
    icon: '🎯',
    titleZh: '每日免费练习局',
    titleEn: 'Daily Free Practice Games',
    descZh: '每天都有组织好的免费练习牌局，随时加入，实战提升',
    descEn: 'Organized free practice sessions daily — join anytime and improve through real play',
  },
  {
    icon: '♠️',
    titleZh: '专业策略分享',
    titleEn: 'Professional Strategy Insights',
    descZh: '职业牌手每日分享实战策略、手牌复盘与赛事分析',
    descEn: 'Daily strategy tips, hand reviews, and tournament analysis from professional players',
  },
  {
    icon: '📺',
    titleZh: '高手直播教学',
    titleEn: 'Live Coaching Streams',
    descZh: '定期举办高手实战直播，边看边学，快速吸收顶尖打法',
    descEn: 'Regular live coaching sessions where you can watch and learn from top-level play',
  },
  {
    icon: '💰',
    titleZh: '独家课程折扣',
    titleEn: 'Exclusive Course Discounts',
    descZh: '社群成员享受所有课程专属折扣，最高节省 40%',
    descEn: 'Community members get exclusive discounts on all courses — save up to 40%',
  },
  {
    icon: '🤝',
    titleZh: '精英玩家人脉',
    titleEn: 'Elite Player Network',
    descZh: '结识来自全球的认真扑克玩家，共同进步，拓展牌局资源',
    descEn: 'Connect with serious players worldwide — grow together and expand your poker network',
  },
  {
    icon: '🏆',
    titleZh: '专属赛事资讯',
    titleEn: 'Exclusive Tournament Info',
    descZh: '第一时间获取优质赛事信息、门票优惠及参赛机会',
    descEn: 'First access to quality tournament info, ticket deals, and participation opportunities',
  },
];

const testimonials = [
  {
    nameZh: '张伟',
    nameEn: 'Zhang Wei',
    textZh: '加入三个月，我的赢率从负数变成了 8bb/100。这个社群的策略讨论真的让我脱胎换骨。',
    textEn: 'Three months in and my winrate went from negative to 8bb/100. The strategy discussions in this community completely transformed my game.',
    avatar: '🧑',
  },
  {
    nameZh: 'Alex M.',
    nameEn: 'Alex M.',
    textZh: '直播教学太棒了，每次都能学到新东西。职业牌手真的很耐心地解答问题。',
    textEn: 'The live coaching sessions are incredible. I learn something new every time and the pros are genuinely patient with questions.',
    avatar: '👨‍💼',
  },
  {
    nameZh: '林小燕',
    nameEn: 'Linda L.',
    textZh: '每天的练习局让我保持手感，策略分享让我持续进步。强烈推荐给每一个认真学扑克的朋友。',
    textEn: 'Daily practice keeps my game sharp and the strategy content keeps me growing. Highly recommend to anyone serious about improving.',
    avatar: '👩',
  },
];

export default function JoinPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [count, setCount] = useState(0);
  const targetCount = 1000;

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(targetCount / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ backgroundColor: '#0d1b2a', minHeight: '100vh', color: '#fff' }}>
      {/* ======================== HERO ======================== */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(26,58,42,0.5) 40%, #0d1b2a 80%)',
          padding: '100px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative card suits */}
        {['♠', '♥', '♦', '♣'].map((suit, i) => (
          <span
            key={suit}
            style={{
              position: 'absolute',
              fontSize: '8rem',
              opacity: 0.04,
              color: '#d4af37',
              top: i < 2 ? '-20px' : 'auto',
              bottom: i >= 2 ? '-20px' : 'auto',
              left: i % 2 === 0 ? `${5 + i * 10}%` : 'auto',
              right: i % 2 !== 0 ? `${5 + (i - 1) * 10}%` : 'auto',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {suit}
          </span>
        ))}

        {/* Telegram icon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#229ED9',
            fontSize: '2.5rem',
            marginBottom: '28px',
            boxShadow: '0 0 40px rgba(34,158,217,0.4)',
          }}
        >
          ✈️
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#d4af37' }}>{isZh ? '加入' : 'Join the '}</span>
          <span style={{ color: '#fff' }}>{isZh ? '扑克精英社区' : 'Poker Elite'}</span>
          <br />
          {isZh ? '' : <span style={{ color: '#d4af37' }}>Community</span>}
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          {isZh
            ? '和 1000+ 位认真的扑克玩家一起，每天进步一点点，直到成为真正的高手'
            : 'Train alongside 1,000+ serious poker players. Improve a little every day until you\'re the one others study.'}
        </p>

        {/* Live count */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 28px',
              borderRadius: '99px',
              border: '1px solid rgba(212,175,55,0.4)',
              backgroundColor: 'rgba(212,175,55,0.08)',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'pulse 2s infinite',
                display: 'inline-block',
              }}
            />
            <span style={{ color: '#d4af37', fontWeight: 700, fontSize: '1.1rem' }}>
              {count.toLocaleString()}+
            </span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
              {isZh ? '位活跃玩家' : 'active players'}
            </span>
          </div>
        </div>

        {/* MEGA CTA */}
        <a
          href="https://t.me/dzdf88"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '20px 52px',
            borderRadius: '16px',
            backgroundColor: '#d4af37',
            color: '#0d1b2a',
            fontWeight: 900,
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            textDecoration: 'none',
            boxShadow: '0 0 60px rgba(212,175,55,0.35), 0 8px 32px rgba(0,0,0,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'scale(1.05) translateY(-2px)';
            el.style.boxShadow = '0 0 80px rgba(212,175,55,0.5), 0 16px 48px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'scale(1) translateY(0)';
            el.style.boxShadow = '0 0 60px rgba(212,175,55,0.35), 0 8px 32px rgba(0,0,0,0.3)';
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>✈️</span>
          {isZh ? '立即加入' : 'Join Now — It\'s Free'}
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </a>

        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginTop: '16px' }}>
          {isZh ? '完全免费 · 随时退出 · 无垃圾信息' : '100% Free · Leave Anytime · No Spam'}
        </p>
      </section>

      {/* ======================== BENEFITS ======================== */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#d4af37',
            marginBottom: '12px',
          }}
        >
          {isZh ? '加入即享受' : 'What You Get'}
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: '56px', fontSize: '1.05rem' }}>
          {isZh ? '进群第一天就能感受到不同' : 'Feel the difference from day one'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.titleEn}
              style={{
                padding: '32px 28px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,175,55,0.15)',
                transition: 'all 0.25s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'rgba(212,175,55,0.4)';
                el.style.backgroundColor = 'rgba(212,175,55,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(212,175,55,0.15)';
                el.style.backgroundColor = 'rgba(255,255,255,0.04)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                ✅ {isZh ? benefit.titleZh : benefit.titleEn}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {isZh ? benefit.descZh : benefit.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================== SOCIAL PROOF ======================== */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.05) 50%, transparent 100%)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#d4af37',
              marginBottom: '48px',
            }}
          >
            {isZh ? '玩家怎么说' : 'What Players Say'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {testimonials.map((t) => (
              <div
                key={t.nameEn}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <p
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{isZh ? t.textZh : t.textEn}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{t.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#d4af37', fontSize: '0.9rem' }}>
                      {isZh ? t.nameZh : t.nameEn}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
                      {isZh ? '社群成员' : 'Community Member'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <section
        style={{
          padding: '100px 24px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.15) 0%, transparent 70%)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          {isZh ? '你的扑克进阶之路' : 'Your Poker Journey'}
          <br />
          <span style={{ color: '#d4af37' }}>{isZh ? '从这里开始' : 'Starts Here'}</span>
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          {isZh
            ? '每一位职业牌手都曾经是新手。今天的第一步，是你成为高手最重要的决定。'
            : 'Every professional was once a beginner. The first step you take today is the most important decision in your poker journey.'}
        </p>

        <a
          href="https://t.me/dzdf88"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '22px 60px',
            borderRadius: '16px',
            backgroundColor: '#d4af37',
            color: '#0d1b2a',
            fontWeight: 900,
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            textDecoration: 'none',
            boxShadow: '0 0 80px rgba(212,175,55,0.4), 0 8px 40px rgba(0,0,0,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'scale(1.06) translateY(-3px)';
            el.style.boxShadow = '0 0 100px rgba(212,175,55,0.55), 0 20px 60px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = 'scale(1) translateY(0)';
            el.style.boxShadow = '0 0 80px rgba(212,175,55,0.4), 0 8px 40px rgba(0,0,0,0.3)';
          }}
        >
          <span style={{ fontSize: '1.6rem' }}>✈️</span>
          {isZh ? '立即加入 →' : 'Join Now — Free →'}
        </a>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '✅', textZh: '完全免费', textEn: 'Completely Free' },
            { icon: '🔒', textZh: '隐私保护', textEn: 'Privacy Protected' },
            { icon: '🚪', textZh: '随时退出', textEn: 'Leave Anytime' },
          ].map((item) => (
            <div key={item.textEn} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
              <span>{item.icon}</span>
              <span>{isZh ? item.textZh : item.textEn}</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
}
