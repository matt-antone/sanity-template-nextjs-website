
export type ArticleStructuredData = {
  title: string
  date: string
  description: string
  url: string
  images: []
  author: string
  publisher: string
  publisherLogo: string
  publisherUrl: string
}

export function createArticleStructuredData(article:ArticleStructuredData) {
  const articleData:any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: [],
    datePublished: article.date,
    dateModified: article.date,
    // author: {
    //   "@type": "Person",
    //   name: "Enenstein Pham",
    // },
    publisher: {
      "@type": "Organization",
      name: "Enenstein Pham",
      logo: {
        "@type": "ImageObject",
        url: "https://www.epgrlawyers.com/logo.png",
      },
    },
  } 
  return article
}