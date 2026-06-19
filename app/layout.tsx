import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { JsonLdScript } from '@/components/json-ld-script'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dipeshkumar.com'
const siteName = 'Dipesh Kumar | Portfolio'
const siteDescription = 'Portfolio of Dipesh Kumar - ML Engineer specializing in ML/Data Science and Backend development. Explore my projects, skills, and experience in Python, FastAPI, and Computer Vision.'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: '%s | Dipesh Kumar',
  },
  description: siteDescription,
  generator: 'v0.app',
  applicationName: siteName,
  authors: [
    {
      name: 'Dipesh Kumar',
      url: 'https://github.com/dipesh4000',
    },
  ],
  creator: 'Dipesh Kumar',
  publisher: 'Dipesh Kumar',
  
  // Canonical URL for SEO
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: './',
  },
  
  // Keywords for search
  keywords: [
    'ML Engineer',
    'Machine Learning',
    'Data Science',
    'Backend Developer',
    'Python Developer',
    'FastAPI',
    'PostgreSQL',
    'Computer Vision',
    'YOLOv8',
    'Deep Learning',
    'Data Engineering',
    'REST API',
    'Dipesh Kumar',
  ],
  
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dipesh Kumar - ML Engineer Portfolio',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@dipesh4000',
    creator: '@dipesh4000',
    title: siteName,
    description: siteDescription,
    images: [`${baseUrl}/og-image.png`],
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification tags (add your actual values in environment)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  
  // Icons
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  
  // Prefers reduced motion
  other: {
    'format-detection': 'telephone=no',
  },
}

// Viewport configuration (separate from metadata export for Next.js 15+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLdScript />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="absolute left-[-10000px] top-auto z-[100] h-px w-px overflow-hidden focus:fixed focus:left-4 focus:top-4 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
