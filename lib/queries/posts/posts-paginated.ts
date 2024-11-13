import { groq } from "next-sanity";

export const POSTS_PAGINATION_QUERY = groq`*[_type == "post" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`