import './globals.css'
import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export const metadata = {
  metadataBase: new URL('https://rickfrancis.vercel.app'),
  title: 'Rick Francis Cruz | Full Stack Developer Portfolio',
  description: 'Software developer specializing in React, Next.js, and modern web applications. View my projects, skills, and experience in building performant, accessible web solutions.',
  keywords: ['Rick Francis Cruz', 'Full Stack Developer', 'React Developer', 'Next.js', 'Web Developer', 'Software Engineer', 'Portfolio'],
  authors: [{ name: 'Rick Francis Cruz' }],
  creator: 'Rick Francis Cruz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rickfrancis.vercel.app',
    title: 'Rick Francis Cruz | Full Stack Developer',
    description: 'Software developer specializing in React, Next.js, and modern web applications.',
    siteName: 'Rick Francis Cruz Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rick Francis Cruz Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rick Francis Cruz | Full Stack Developer',
    description: 'Software developer specializing in React, Next.js, and modern web applications.',
    images: ['/og-image.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

// Keep layout as a server component. Avoid importing client-only libs (framer-motion)
// here — use framer-motion inside client components only (Hero, About, etc.).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ErrorBoundary>
          <main id="main-content">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  )
}
