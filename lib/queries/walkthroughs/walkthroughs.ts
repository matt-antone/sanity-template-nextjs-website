import { groq } from "next-sanity";

export const WALKTHROUGHS_ALL_QUERY = groq`*[_type == "walkthrough" && defined(slug)]  | order(date desc) {
...,
  slug,
  gallery[]{...,asset->},
}`;