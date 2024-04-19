import { MetadataRoute } from 'next'
import { SanityDocument } from "next-sanity";
import dotenv from 'dotenv';
dotenv.config();

import { loadQuery } from "@/sanity/lib/store";
import { SITEMAP_QUERY } from "@/src/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: { posts, pages },
  } = await loadQuery<SanityDocument>(SITEMAP_QUERY);

  const getURL = (page:any)=>{
    return {
      url: `${process.env.BASE_URL}/${page.slug}`,
      lastModified: page._updatedAt || page.date,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  }

  return [
    ...pages.map((page: any) => getURL(page)),
    ...posts.map((post: any) => getURL(post))
  ]
}