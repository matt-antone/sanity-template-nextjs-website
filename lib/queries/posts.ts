import { groq } from "next-sanity";

export const POSTS_ALL_QUERY = groq`*[_type == "post" && defined(slug)]  | order(date desc) {
  slug,
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{
  ...,
  image{...,asset->},
}[0]`;

export const PAGINATION_QUERY = groq`*[_type == "post" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`


export const POST_ALGOLIA_QUERY = groq`*[_type == "post" && slug.current == $slug]{
  "objectID": _id,
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
 }[0]`;