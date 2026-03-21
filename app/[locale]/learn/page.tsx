'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

type Category = 'all' | 'beginner' | 'strategy' | 'advanced' | 'psychology';

interface Article {
  id: number;
  titleZh: string;
  titleEn: string;
  excerptZh: string;
  excerptEn: string;
  category: Exclude<Category, 'all'>;
  readTime: number;
  date: string;
}

const articles: Article[] = [
  {
    id: 1,
    titleZh: '扑克新手必读：德州扑克基础规则全解析',
    titleEn: 'Poker 101: Complete Guide to Texas Hold\'em Rules',
    excerptZh: '从手牌排名到下注轮次，全面掌握德州扑克的基础玩法，让你从零开始快速入门。',
    excerptEn: 'From hand rankings to betting rounds, master the fundamentals of Texas Hold\'em from scratch.',
    category: 'beginner',
    readTime: 8,
    date: '2024-03-01',
  },
  {
    id: 2,
    titleZh: '位置的力量：为什么位置比底牌更重要',
    titleEn: 'The Power of Position: Why It Matters More Than Your Cards',
    excerptZh: '位置是扑克最被低估的优势之一。了解如何利用位置优势最大化你的赢率。',
    excerptEn: 'Position is one of poker\'s most underrated edges. Learn to exploit positional advantage to maximize your win rate.',
    category: 'strategy',
    readTime: 12,
    date: '2024-03-05',
  },
  {
    id: 3,
    titleZh: 'GTO 策略入门：平衡型打法的核心思想',
    titleEn: 'Intro to GTO: Core Concepts of Balanced Play',
    excerptZh: '博弈论最优（GTO）策略正在改变现代扑克。本文带你理解平衡打法的底层逻辑。',
    excerptEn: 'Game Theory Optimal (GTO) strategy is reshaping modern poker. Understand the logic behind balanced play.',
    category: 'advanced',
    readTime: 18,
    date: '2024-03-08',
  },
  {
    id: 4,
    titleZh: '扑克心理学：如何识别并利用对手的倾斜状态',
    titleEn: 'Poker Psychology: Detecting and Exploiting Tilt',
    excerptZh: '情绪控制是顶尖牌手的必备技能。学会识别对手的倾斜信号并将其转化为筹码。',
    excerptEn: 'Emotional control separates pros from amateurs. Spot tilt signals and turn them into chips.',
    category: 'psychology',
    readTime: 10,
    date: '2024-03-10',
  },
  {
    id: 5,
    titleZh: '翻前范围构建：如何选择正确的起手牌',
    titleEn: 'Preflop Range Construction: Choosing the Right Starting Hands',
    excerptZh: '起手牌选择是扑克决策的第一步。掌握科学的范围构建方法，避免常见的新手错误。',
    excerptEn: 'Starting hand selection is step one. Build scientific ranges and avoid common beginner mistakes.',
    category: 'strategy',
    readTime: 14,
    date: '2024-03-12',
  },
  {
    id: 6,
    titleZh: 'C-Bet 技巧精讲：翻后持续下注的正确时机',
    titleEn: 'C-Bet Mastery: When and How to Continuation Bet',
    excerptZh: '持续下注是扑克中最常用的武器之一，但滥用会付出惨重代价。本文深度解析最优 C-Bet 策略。',
    excerptEn: 'C-betting is one of poker\'s most common weapons—but overuse is costly. Deep dive into optimal C-bet strategy.',
    category: 'advanced',
    readTime: 16,
    date: '2024-03-15',
  },
  {
    id: 7,
    titleZh: '资金管理：职业牌手如何保护他们的牌局资金',
    titleEn: 'Bankroll Management: How Pros Protect Their Poker Funds',
    excerptZh: '再好的技术没有合理的资金管理也会破产。了解专业级资金管理策略，打造长期盈利体系。',
    excerptEn: 'Even the best skill won\'t save you without proper bankroll management. Build a system for long-term profitability.',
    category: 'beginner',
    readTime: 9,
    date: '2024-03-18',
  },
  {
    id: 8,
    titleZh: '控制自我：扑克中的情绪管理与决策质量',
    titleEn: 'Mastering Your Mind: Emotional Regulation and Decision Quality in Poker',
    excerptZh: '糟糕的情绪状态是扑克中最大的泄露点。学习专业的心理训练方法，保持每局最佳决策状态。',
    excerptEn: 'Poor emotional states are poker\'s biggest leak. Learn professional mental training to sustain peak decision-making.',
    category: 'psychology',
    readTime: 13,
    date: '2024-03-20',
  },
  {
    id: 9,
    titleZh: '翻后游戏深解：转牌与河牌的决策框架',
    titleEn: 'Postflop Deep Dive: Decision Frameworks for Turn and River',
    excerptZh: '大多数玩家的差距在翻后。建立系统性的转牌、河牌决策框架，弥补最关键的技术漏洞。',
    excerptEn: 'Most players\' edges live postflop. Build systematic turn and river decision frameworks to fix critical leaks.',
    category: 'advanced',
    readTime: 20,
    date: '2024-03-22',
  },
  {
    id: 10,
    titleZh: '从业余到职业：扑克进阶路线图全攻略',
    titleEn: 'Amateur to Pro: The Complete Poker Improvement Roadmap',
    excerptZh: '明确的学习路线是快速进步的关键。跟随职业牌手规划你的扑克成长路径，少走弯路。',
    excerptEn: 'A clear learning roadmap is the key to rapid improvement. Follow a pro\'s blueprint and take the shortest path to success.',
    category: 'strategy',
    readTime: 11,
    date: '2024-03-25',
  },
  {
    id: 11,
    titleZh: 'Understanding Pot Odds: The Math That Wins Pots',
    titleEn: 'Understanding Pot Odds: The Math That Wins Pots',
    excerptZh: 'Pot odds are the foundation of profitable poker math. Master this concept and never make a costly calling mistake again.',
    excerptEn: 'Pot odds are the foundation of profitable poker math. Master this concept and never make a costly calling mistake again.',
    category: 'beginner',
    readTime: 7,
    date: '2024-03-27',
  },
  {
    id: 12,
    titleZh: 'Bluffing with Purpose: How to Run Credible Bluffs',
    titleEn: 'Bluffing with Purpose: How to Run Credible Bluffs',
    excerptZh: 'Bluffing isn\'t gambling—it\'s storytelling. Learn how to construct believable narratives that fold the best hands.',
    excerptEn: 'Bluffing isn\'t gambling—it\'s storytelling. Learn how to construct believable narratives that fold the best hands.',
    category: 'strategy',
    readTime: 15,
    date: '2024-03-28',
  },
  {
    id: 13,
    titleZh: 'Solver-Based Study: Using PioSOLVER to Fix Leaks',
    titleEn: 'Solver-Based Study: Using PioSOLVER to Fix Leaks',
    excerptZh: 'Modern poker study is solver-driven. Learn how to use PioSOLVER to identify and patch your biggest strategic leaks.',
    excerptEn: 'Modern poker study is solver-driven. Learn how to use PioSOLVER to identify and patch your biggest strategic leaks.',
    category: 'advanced',
    readTime: 22,
    date: '2024-03-29',
  },
  {
    id: 14,
    titleZh: 'Reading Tells: Physical and Digital Signals at the Table',
    titleEn: 'Reading Tells: Physical and Digital Signals at the Table',
    excerptZh: 'Tells aren\'t just about shaking hands. Discover the subtle behavioral patterns that reveal opponent intentions.',
    excerptEn: 'Tells aren\'t just about shaking hands. Discover the subtle behavioral patterns that reveal opponent intentions.',
    category: 'psychology',
    readTime: 11,
    date: '2024-03-30',
  },
  {
    id: 15,
    titleZh: 'Tournament Strategy: ICM and Bubble Play Explained',
    titleEn: 'Tournament Strategy: ICM and Bubble Play Explained',
    excerptZh: 'Tournament poker has unique dynamics. Master ICM pressure and bubble play to climb the money ladder consistently.',
    excerptEn: 'Tournament poker has unique dynamics. Master ICM pressure and bubble play to climb the money ladder consistently.',
    category: 'advanced',
    readTime: 19,
    date: '2024-04-01',
  },
  {
    id: 16,
    titleZh: 'Stack Sizes Matter: Adjusting Play for Short and Deep Stacks',
    titleEn: 'Stack Sizes Matter: Adjusting Play for Short and Deep Stacks',
    excerptZh: 'Stack-to-pot ratios fundamentally change optimal strategy. Learn to adapt your play across all stack depths.',
    excerptEn: 'Stack-to-pot ratios fundamentally change optimal strategy. Learn to adapt your play across all stack depths.',
    category: 'strategy',
    readTime: 13,
    date: '2024-04-02',
  },
  {
    id: 17,
    titleZh: 'The Mental Game: Building a Resilient Poker Mindset',
    titleEn: 'The Mental Game: Building a Resilient Poker Mindset',
    excerptZh: 'Variance is unavoidable. Build the mental fortitude to play your A-game through losing streaks and bad beats.',
    excerptEn: 'Variance is unavoidable. Build the mental fortitude to play your A-game through losing streaks and bad beats.',
    category: 'psychology',
    readTime: 14,
    date: '2024-04-03',
  },
  {
    id: 18,
    titleZh: 'Hand Reading 101: Putting Opponents on a Range',
    titleEn: 'Hand Reading 101: Putting Opponents on a Range',
    excerptZh: 'Hand reading is the core skill of winning poker. Learn systematic techniques to narrow down opponent ranges street by street.',
    excerptEn: 'Hand reading is the core skill of winning poker. Learn systematic techniques to narrow down opponent ranges street by street.',
    category: 'beginner',
    readTime: 10,
    date: '2024-04-04',
  },
  {
    id: 19,
    titleZh: 'Exploitative vs. GTO: When to Deviate from Balance',
    titleEn: 'Exploitative vs. GTO: When to Deviate from Balance',
    excerptZh: 'Pure GTO is rarely optimal against real opponents. Know when to shift to exploitative strategies for maximum profit.',
    excerptEn: 'Pure GTO is rarely optimal against real opponents. Know when to shift to exploitative strategies for maximum profit.',
    category: 'advanced',
    readTime: 17,
    date: '2024-04-05',
  },
  {
    id: 20,
    titleZh: 'Your First 100 Hours: A Beginner\'s Structured Study Plan',
    titleEn: 'Your First 100 Hours: A Beginner\'s Structured Study Plan',
    excerptZh: 'The first 100 hours define your poker foundation. Follow this structured study plan to build winning habits from day one.',
    excerptEn: 'The first 100 hours define your poker foundation. Follow this structured study plan to build winning habits from day one.',
    category: 'beginner',
    readTime: 8,
    date: '2024-04-06',
  },
];

const categoryConfig: Record<Category, { labelZh: string; labelEn: string; color: string }> = {
  all: { labelZh: '全部', labelEn: 'All', color: '#d4af37' },
  beginner: { labelZh: '入门', labelEn: 'Beginner', color: '#4ade80' },
  strategy: { labelZh: '策略', labelEn: 'Strategy', color: '#60a5fa' },
  advanced: { labelZh: '进阶', labelEn: 'Advanced', color: '#f97316' },
  psychology: { labelZh: '心理', labelEn: 'Psychology', color: '#a78bfa' },
};

export default function LearnPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const title = isZh ? a.titleZh : a.titleEn;
    const excerpt = isZh ? a.excerptZh : a.excerptEn;
    const matchesSearch =
      searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          {isZh ? '扑克学习中心' : 'Poker Learning Hub'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {isZh
            ? '从入门到精通，系统化提升你的扑克技术与思维'
            : 'From beginner to expert — systematically elevate your poker skill and mindset'}
        </p>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0' }}>
        {/* Search */}
        <div style={{ marginBottom: '32px', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#d4af37',
              fontSize: '1.1rem',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isZh ? '搜索文章...' : 'Search articles...'}
            style={{
              width: '100%',
              padding: '14px 16px 14px 46px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.3)')}
          />
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {(Object.keys(categoryConfig) as Category[]).map((cat) => {
            const cfg = categoryConfig[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  border: `1px solid ${isActive ? cfg.color : 'rgba(255,255,255,0.15)'}`,
                  backgroundColor: isActive ? cfg.color : 'transparent',
                  color: isActive ? '#0d1b2a' : 'rgba(255,255,255,0.7)',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isZh ? cfg.labelZh : cfg.labelEn}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '24px' }}>
          {isZh ? `共 ${filteredArticles.length} 篇文章` : `${filteredArticles.length} articles found`}
        </p>

        {/* Article Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredArticles.map((article) => {
            const catCfg = categoryConfig[article.category];
            const title = isZh ? article.titleZh : article.titleEn;
            const excerpt = isZh ? article.excerptZh : article.excerptEn;
            return (
              <article
                key={article.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '16px',
                  padding: '28px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = 'rgba(212,175,55,0.5)';
                  el.style.backgroundColor = 'rgba(255,255,255,0.07)';
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(212,175,55,0.15)';
                  el.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Gold accent top bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${catCfg.color}, transparent)`,
                  }}
                />

                {/* Category + Read Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '99px',
                      backgroundColor: `${catCfg.color}20`,
                      border: `1px solid ${catCfg.color}50`,
                      color: catCfg.color,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    {isZh ? catCfg.labelZh : catCfg.labelEn}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                    ⏱ {article.readTime} {isZh ? '分钟' : 'min'}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '12px',
                    lineHeight: 1.5,
                  }}
                >
                  {title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {excerpt}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>{article.date}</span>
                  <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 600 }}>
                    {isZh ? '阅读全文 →' : 'Read more →'}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.4)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🃏</p>
            <p style={{ fontSize: '1.1rem' }}>
              {isZh ? '没有找到相关文章' : 'No articles found'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
