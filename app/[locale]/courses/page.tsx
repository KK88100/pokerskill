'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface Chapter {
  id: number;
  titleZh: string;
  titleEn: string;
  duration: string;
  free: boolean;
}

interface Course {
  id: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  price: number | 'free';
  chapters: Chapter[];
  totalChapters: number;
  totalDuration: string;
  gradient: string;
  icon: string;
  level: string;
  levelZh: string;
}

const courses: Course[] = [
  {
    id: 1,
    titleZh: '德州扑克入门课',
    titleEn: 'Texas Hold\'em Beginner Course',
    descriptionZh:
      '专为零基础玩家设计。从牌型认识到基本策略，系统讲解德州扑克的核心概念，让你在最短时间内掌握正确的游戏框架。',
    descriptionEn:
      'Designed for absolute beginners. From hand rankings to basic strategy, this course gives you a solid poker foundation in the shortest time possible.',
    price: 'free',
    gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0d2b1a 50%, #1a4a2a 100%)',
    icon: '🃏',
    level: 'Beginner',
    levelZh: '入门级',
    totalChapters: 12,
    totalDuration: '4h 30min',
    chapters: [
      { id: 1, titleZh: '第1课：牌型与手牌排名', titleEn: 'Lesson 1: Hand Rankings', duration: '22min', free: true },
      { id: 2, titleZh: '第2课：游戏流程与下注轮次', titleEn: 'Lesson 2: Game Flow & Betting Rounds', duration: '28min', free: true },
      { id: 3, titleZh: '第3课：位置的基础概念', titleEn: 'Lesson 3: Position Basics', duration: '25min', free: true },
      { id: 4, titleZh: '第4课：起手牌选择入门', titleEn: 'Lesson 4: Starting Hand Selection', duration: '30min', free: false },
      { id: 5, titleZh: '第5课：翻前下注策略', titleEn: 'Lesson 5: Preflop Betting Strategy', duration: '35min', free: false },
      { id: 6, titleZh: '第6课：底池赔率与胜率计算', titleEn: 'Lesson 6: Pot Odds & Equity', duration: '40min', free: false },
    ],
  },
  {
    id: 2,
    titleZh: '扑克进阶策略课',
    titleEn: 'Advanced Poker Strategy Course',
    descriptionZh:
      '面向有一定基础的玩家。深入讲解翻后策略、范围优势、下注尺寸选择与 GTO 基础思想，帮助你突破瓶颈、实现盈利。',
    descriptionEn:
      'For players with a foundation. Covers postflop strategy, range advantage, bet sizing, and GTO fundamentals to break through plateaus and reach profitability.',
    price: 399,
    gradient: 'linear-gradient(135deg, #1a1a3a 0%, #0d0d2b 50%, #2a1a4a 100%)',
    icon: '♠️',
    level: 'Intermediate',
    levelZh: '进阶级',
    totalChapters: 20,
    totalDuration: '9h 15min',
    chapters: [
      { id: 1, titleZh: '第1课：范围构建与范围优势', titleEn: 'Lesson 1: Range Building & Range Advantage', duration: '45min', free: true },
      { id: 2, titleZh: '第2课：翻后 C-Bet 策略精讲', titleEn: 'Lesson 2: Postflop C-Bet Mastery', duration: '50min', free: false },
      { id: 3, titleZh: '第3课：下注尺寸的选择逻辑', titleEn: 'Lesson 3: Bet Sizing Logic', duration: '55min', free: false },
      { id: 4, titleZh: '第4课：GTO 入门与平衡打法', titleEn: 'Lesson 4: Intro to GTO & Balanced Play', duration: '60min', free: false },
      { id: 5, titleZh: '第5课：价值下注与诈唬的频率', titleEn: 'Lesson 5: Value Bet & Bluff Frequencies', duration: '50min', free: false },
      { id: 6, titleZh: '第6课：翻牌面纹理分析', titleEn: 'Lesson 6: Board Texture Analysis', duration: '45min', free: false },
    ],
  },
  {
    id: 3,
    titleZh: '职业牌手成长计划',
    titleEn: 'Professional Poker Mastery Program',
    descriptionZh:
      '为志在成为职业牌手的学员打造。涵盖 Solver 训练、对手剖析、锦标赛 ICM、心理博弈与资金管理等职业级内容，全面武装你的竞技能力。',
    descriptionEn:
      'Built for aspiring professionals. Covers solver training, opponent profiling, tournament ICM, mental game, and bankroll management at a competitive level.',
    price: 999,
    gradient: 'linear-gradient(135deg, #3a1a0d 0%, #2b0d0d 50%, #4a2a0a 100%)',
    icon: '👑',
    level: 'Professional',
    levelZh: '职业级',
    totalChapters: 32,
    totalDuration: '18h 40min',
    chapters: [
      { id: 1, titleZh: '第1课：Solver 训练方法论', titleEn: 'Lesson 1: Solver Training Methodology', duration: '70min', free: true },
      { id: 2, titleZh: '第2课：对手剖析与漏洞挖掘', titleEn: 'Lesson 2: Opponent Profiling & Leak Exploitation', duration: '65min', free: false },
      { id: 3, titleZh: '第3课：锦标赛 ICM 深度解析', titleEn: 'Lesson 3: Tournament ICM Deep Dive', duration: '75min', free: false },
      { id: 4, titleZh: '第4课：职业心理博弈与情绪控制', titleEn: 'Lesson 4: Pro Mental Game & Tilt Control', duration: '60min', free: false },
      { id: 5, titleZh: '第5课：资金管理与职业化运营', titleEn: 'Lesson 5: Bankroll Management & Career Operations', duration: '55min', free: false },
      { id: 6, titleZh: '第6课：实战手牌深度复盘', titleEn: 'Lesson 6: Live Hand History Deep Reviews', duration: '80min', free: false },
    ],
  },
];

export default function CoursesPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  return (
    <main style={{ backgroundColor: '#0d1b2a', minHeight: '100vh', color: '#fff', paddingBottom: '80px' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a2a 60%, #0d1b2a 100%)',
          padding: '80px 24px 60px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#d4af37',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          {isZh ? '系统课程' : 'Structured Courses'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
          {isZh
            ? '由职业牌手精心设计，从入门到职业的完整学习路径'
            : 'Designed by professional players — a complete learning path from beginner to pro'}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { value: '3', labelZh: '精品课程', labelEn: 'Courses' },
            { value: '64', labelZh: '课时内容', labelEn: 'Lessons' },
            { value: '32h+', labelZh: '视频时长', labelEn: 'Video Content' },
          ].map((stat) => (
            <div key={stat.value} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#d4af37' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{isZh ? stat.labelZh : stat.labelEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {courses.map((course) => {
            const isExpanded = expandedCourse === course.id;
            const isFree = course.price === 'free';
            const priceLabel = isFree
              ? isZh ? '免费' : 'FREE'
              : `¥${course.price}`;

            return (
              <div
                key={course.id}
                style={{
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                {/* Course Cover */}
                <div
                  style={{
                    background: course.gradient,
                    padding: '48px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    borderBottom: '1px solid rgba(212,175,55,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative circles */}
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-60px', right: '100px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(212,175,55,0.04)', pointerEvents: 'none' }} />

                  <div style={{ flex: 1, minWidth: '280px' }}>
                    {/* Level Badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        borderRadius: '99px',
                        border: '1px solid rgba(212,175,55,0.5)',
                        color: '#d4af37',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        marginBottom: '16px',
                      }}
                    >
                      {isZh ? course.levelZh : course.level}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '2.5rem' }}>{course.icon}</span>
                      <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        {isZh ? course.titleZh : course.titleEn}
                      </h2>
                    </div>

                    <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '20px' }}>
                      {isZh ? course.descriptionZh : course.descriptionEn}
                    </p>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                        📚 {course.totalChapters} {isZh ? '章节' : 'lessons'}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                        🎬 {course.totalDuration} {isZh ? '视频' : 'video'}
                      </span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div style={{ textAlign: 'center', minWidth: '160px' }}>
                    <div
                      style={{
                        fontSize: isFree ? '2rem' : '2.5rem',
                        fontWeight: 900,
                        color: isFree ? '#4ade80' : '#d4af37',
                        marginBottom: '16px',
                        lineHeight: 1,
                      }}
                    >
                      {priceLabel}
                    </div>

                    {isFree ? (
                      <a
                        href="#"
                        style={{
                          display: 'block',
                          padding: '14px 32px',
                          borderRadius: '12px',
                          backgroundColor: '#d4af37',
                          color: '#0d1b2a',
                          fontWeight: 800,
                          fontSize: '1rem',
                          textDecoration: 'none',
                          textAlign: 'center',
                          transition: 'transform 0.15s, box-shadow 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(212,175,55,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                        }}
                      >
                        {isZh ? '立即开始 →' : 'Start Free →'}
                      </a>
                    ) : (
                      <a
                        href="https://t.me/dzdf88"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          padding: '14px 24px',
                          borderRadius: '12px',
                          backgroundColor: '#229ED9',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          textDecoration: 'none',
                          textAlign: 'center',
                          transition: 'transform 0.15s, box-shadow 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(34,158,217,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                        }}
                      >
                        📱 {isZh ? '加入 Telegram 获取' : 'Get via Telegram'}
                      </a>
                    )}

                    {!isFree && (
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '10px' }}>
                        {isZh ? '加群后即可解锁' : 'Unlock after joining group'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Chapter List Toggle */}
                <div style={{ padding: '0' }}>
                  <button
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span>
                      {isZh ? '查看课程大纲' : 'View Curriculum'}
                      <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
                        ({isZh ? `共 ${course.totalChapters} 节` : `${course.totalChapters} lessons`})
                      </span>
                    </span>
                    <span style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▾
                    </span>
                  </button>

                  {isExpanded && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 0 16px' }}>
                      {course.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 32px',
                            transition: 'background 0.15s',
                            cursor: 'default',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>
                              {chapter.free ? '▶️' : '🔒'}
                            </span>
                            <span style={{ color: chapter.free ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
                              {isZh ? chapter.titleZh : chapter.titleEn}
                            </span>
                            {chapter.free && (
                              <span
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: '99px',
                                  backgroundColor: 'rgba(74,222,128,0.15)',
                                  border: '1px solid rgba(74,222,128,0.4)',
                                  color: '#4ade80',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                }}
                              >
                                {isZh ? '免费' : 'FREE'}
                              </span>
                            )}
                          </div>
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
                            {chapter.duration}
                          </span>
                        </div>
                      ))}

                      {/* Show more indicator */}
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '12px',
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: '0.85rem',
                        }}
                      >
                        {isZh
                          ? `... 还有 ${course.totalChapters - course.chapters.length} 节内容`
                          : `... and ${course.totalChapters - course.chapters.length} more lessons`}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '60px',
            padding: '48px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1a3a2a, #0d1b2a)',
            border: '1px solid rgba(212,175,55,0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d4af37', marginBottom: '12px' }}>
            {isZh ? '不确定从哪里开始？' : 'Not sure where to start?'}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
            {isZh
              ? '加入我们的 Telegram 社群，让职业牌手为你量身推荐学习路径'
              : 'Join our Telegram community and let our professional players recommend the right path for you'}
          </p>
          <a
            href="https://t.me/dzdf88"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              borderRadius: '12px',
              backgroundColor: '#229ED9',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            📱 {isZh ? '加入 Telegram 社群' : 'Join Telegram Community'}
          </a>
        </div>
      </div>
    </main>
  );
}
