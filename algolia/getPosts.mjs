import { createClient } from 'next-sanity'
import dotenv from "dotenv";
dotenv.config();

export const apiVersion = '2024-03-22'

export const dataset = "production"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const useCdn = false

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export const getPosts = async () => {
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  })

  const queryStr = `*[_type == "post" && defined(slug)]  | order(date desc) [0...1000] {
   _id,
   title,
   "slug": slug.current,
   date,
   body,
   categories[]->{
     title,
   },
   profiles[]->{
     title,
   },
   excerpt,
   image{"url": asset->url,"altText": asset->altText},
   gallery[]{"url": asset->url,"altText": asset->altText},
 }`

  return await client.fetch(queryStr);
};
