import { MetadataRoute } from 'next'
import dotenv from 'dotenv';
dotenv.config();

import { loadQuery } from "@/sanity/lib/store";
import { SITEMAP_QUERY } from "@/lib/queries";
import { PageDocument, PostDocument } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: { posts, pages },
  } = await loadQuery<PostDocument | PageDocument>(SITEMAP_QUERY);

  const getURL = (page:any,path:string = '')=>{
    return {
      url: `${process.env.VERCEL_PRODUCTION_URL}/${path}${page.slug}`,
      lastModified: page._updatedAt || page.date,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  }

  return [
    ...pages.map((page: any) => getURL(page)),
    ...posts.map((post: any) => getURL(post,'posts/'))
  ]
}