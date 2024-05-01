import { groq } from "next-sanity";

export const POSTS_ALL_QUERY = groq`*[_type == "posts" && defined(slug)]  | order(date desc) {
  slug,
}`;

export const POSTS_QUERY = groq`*[_type == "posts" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`;

export const POST_QUERY = groq`*[_type == "posts" && slug.current == $slug]{
  ...,
  image{...,asset->},
}[0]`;

export const PAGINATION_QUERY = groq`*[_type == "posts" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`
