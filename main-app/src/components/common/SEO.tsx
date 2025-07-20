'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
  canonical?: string
  children?: React.ReactNode
}

export function SEO({
  title = 'Freddy English Tutor - AI-Powered English Learning',
  description = 'Learn English with Freddy, your AI-powered tutor. Practice conversations, improve grammar, and enhance your vocabulary with personalized lessons.',
  keywords = ['english learning', 'ai tutor', 'language practice', 'grammar', 'vocabulary', 'conversation'],
  image = '/images/freddy-avatar.jpg',
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  nofollow = false,
  canonical,
  children
}: SEOProps) {
  const fullTitle = title.includes('Freddy') ? title : `${title} | Freddy English Tutor`
  const fullUrl = url ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://freddy-english.com'}${url}` : undefined
  const fullImage = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://freddy-english.com'}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex" />}
      {nofollow && <meta name="robots" content="nofollow" />}
      {noindex && nofollow && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />
      {fullUrl && <meta property="og:url" content={fullUrl} />}
      <meta property="og:site_name" content="Freddy English Tutor" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Freddy English Tutor" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional children */}
      {children}
    </Head>
  )
}

// Helper component for page-specific SEO
interface PageSEOProps extends Omit<SEOProps, 'title'> {
  pageTitle: string
}

export function PageSEO({ pageTitle, ...props }: PageSEOProps) {
  return <SEO title={pageTitle} {...props} />
}

// Helper component for chat page SEO
export function ChatSEO() {
  return (
    <SEO
      title="Chat with Freddy"
      description="Start a conversation with Freddy, your AI English tutor. Practice speaking, ask questions, and improve your English skills through interactive chat."
      keywords={['english chat', 'ai conversation', 'speaking practice', 'english tutor', 'language learning']}
      type="website"
    />
  )
}

// Helper component for lessons page SEO
export function LessonsSEO() {
  return (
    <SEO
      title="English Lessons"
      description="Access structured English lessons designed by Freddy. Learn grammar, vocabulary, and conversation skills through interactive exercises."
      keywords={['english lessons', 'grammar lessons', 'vocabulary exercises', 'structured learning']}
      type="website"
    />
  )
}

// Helper component for profile page SEO
export function ProfileSEO() {
  return (
    <SEO
      title="My Profile"
      description="View and manage your learning progress, settings, and achievements with Freddy English Tutor."
      keywords={['user profile', 'learning progress', 'achievements', 'settings']}
      type="profile"
    />
  )
} 