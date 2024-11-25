import { groq } from "next-sanity";

export const GUIDES_ALL_QUERY = groq`*[_type == "guide" && defined(slug)]  | order(date desc) {
...,
  slug,
  gallery[]{...,asset->},
}`;