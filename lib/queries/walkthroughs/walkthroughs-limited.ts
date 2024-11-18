import { groq } from "next-sanity";

export const WALKTHROUGH_LIMITED_QUERY = groq`*[_type == "walkthrough" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  gallery[]{...,asset->},,
}`;

