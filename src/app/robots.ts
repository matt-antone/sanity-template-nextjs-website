import { MetadataRoute } from 'next'
import dotenv from 'dotenv';
dotenv.config();

 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}