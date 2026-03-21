import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from './lib/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: true,
})

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /studio (Sanity Studio)
  // - files with extensions (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
