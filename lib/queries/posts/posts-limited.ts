import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`;

