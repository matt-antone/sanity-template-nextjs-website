import { groq } from "next-sanity";

export const WALKTHROUGH_PAGINATION_QUERY = groq`*[_type == "walkthrough" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  gallery[]{...,asset->},,
}`