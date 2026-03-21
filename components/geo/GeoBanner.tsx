'use client'

import { useState, useEffect } from 'react'
import { X, Globe } from 'lucide-react'
import Link from 'next/link'

// Geo-aware banner – detects user locale/timezone and suggests the right language.
// Falls back gracefully when the Geolocation API or Intl is unavailable.

interface GeoBannerProps {
  currentLocale: string
  telegramUrl?: string
}

type RegionType = 'cn' | 'asia' | 'other'

function detectRegion(): RegionType {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!tz) return 'other'

    const cnZones = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Urumqi', 'Asia/Kashgar']
    const asiaZones = [
      'Asia/Taipei', 'Asia/Hong_Kong', 'Asia/Macau',
      'Asia/Singapore', 'Asia/Kuala_Lumpur', 'Asia/Bangkok',
      'Asia/Ho_Chi_Minh', 'Asia/Jakarta', 'Asia/Manila',
      'Asia/Tokyo', 'Asia/Seoul',
    ]

    if (cnZones.includes(tz)) return 'cn'
    if (asiaZones.includes(tz) || tz.startsWith('Asia/')) return 'asia'
  } catch {
    // Intl not available
  }
  return 'other'
}

function getBannerConfig(region: RegionType, currentLocale: string) {
  if (region === 'cn' && currentLocale !== 'zh') {
    return {
      message: '我们检测到您在中国大陆，是否切换为中文？',
      action: '切换中文',
      locale: 'zh',
      flag: '🇨🇳',
    }
  }
  if ((region === 'asia') && currentLocale !== 'zh') {
    return {
      message: 'We detected you may prefer Chinese — switch to 中文?',
      action: '切换中文',
      locale: 'zh',
      flag: '🌏',
    }
  }
  if (region === 'other' && currentLocale !== 'en') {
    return {
      message: '我们检测到您使用英文浏览器，是否切换为 English？',
      action: 'Switch to English',
      locale: 'en',
      flag: '🇺🇸',
    }
  }
  return null
}

export default function GeoBanner({ currentLocale, telegramUrl = 'https://t.me/dzdf88' }: GeoBannerProps) {
  const [dismissed, setDismissed] = useState(true) // start hidden, show after mount
  const [bannerConfig, setBannerConfig] = useState<ReturnType<typeof getBannerConfig>>(null)

  useEffect(() => {
    // Check if user already dismissed within this session
    const key = 'geo-banner-dismissed'
    if (sessionStorage.getItem(key)) return

    const region = detectRegion()
    const config = getBannerConfig(region, currentLocale)
    if (config) {
      setBannerConfig(config)
      setDismissed(false)
    }
  }, [currentLocale])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem('geo-banner-dismissed', '1')
  }

  if (dismissed || !bannerConfig) return null

  return (
    <div
      role="banner"
      aria-live="polite"
      className="relative z-50 bg-navy-900 border-b border-gold-500/30 px-4 py-2.5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-white/80 min-w-0">
          <Globe className="w-4 h-4 text-gold-500 shrink-0" />
          <span className="truncate">
            {bannerConfig.flag} {bannerConfig.message}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/${bannerConfig.locale}`}
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 underline underline-offset-2 transition-colors"
            onClick={handleDismiss}
          >
            {bannerConfig.action}
          </Link>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold bg-gold-500 text-navy-950 px-3 py-1 rounded-lg hover:bg-gold-400 transition-colors"
          >
            📱 Telegram
          </a>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="text-white/40 hover:text-white transition-colors p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
