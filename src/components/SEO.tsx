import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
}

const SEO = ({
  title = '个人主页 - DyHamster',
  description = '欢迎来到我的个人主页，这里分享我的技术文章、项目作品和个人经历。',
  keywords = '个人主页, 技术博客, 前端开发, React, TypeScript, JavaScript',
  image = 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Personal%20homepage%20hero%20image%20with%20modern%20minimalist%20design%2C%20clean%20layout%2C%20professional%20tech%20theme&image_size=landscape_16_9',
  url = window.location.href,
  type = 'website',
  author = 'DyHamster',
  publishedTime,
  modifiedTime,
  noindex = false,
}: SEOProps) => {
  const siteName = 'DyHamster 的个人主页'
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`

  return (
    <Helmet>
      {/* 基础 meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={`@${author.toLowerCase().replace(/\s+/g, '')}`} />
      
      {/* 文章特定 meta 标签 */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content={keywords} />
        </>
      )}
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'profile' ? 'Person' : type === 'article' ? 'Article' : 'WebSite',
          name: author,
          url: url,
          description: description,
          image: image,
          ...(type === 'article' && {
            headline: title,
            datePublished: publishedTime,
            dateModified: modifiedTime,
            author: {
              '@type': 'Person',
              name: author,
            },
          }),
        })}
      </script>
      
      {/* 额外的 SEO 标签 */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <link rel="canonical" href={url} />
      
      {/* 预加载关键资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

export default SEO