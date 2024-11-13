import { groq } from "next-sanity";

export const POSTS_ALL_QUERY = groq`*[_type == "post" && defined(slug)]  | order(date desc) {
  slug,
}`;