import { groq } from "next-sanity";

export const GUIDES_LIMITED_QUERY = groq`*[_type == "guide" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  gallery[]{...,asset->},,
}`;

