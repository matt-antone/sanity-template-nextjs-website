import { groq } from "next-sanity";

export const GUIDES_PAGINATION_QUERY = groq`*[_type == "guide" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  gallery[]{...,asset->},,
}`