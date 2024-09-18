import { groq } from "next-sanity";

export const SITEMAP_QUERY = groq`{
  "pages": *[_type == "page"]{
    title,
    date,
    "slug": slug.current,
  }|order(title asc),
  "posts": *[_type == "post"]|order(date desc){
    title,
    date,
    _updatedAt,
    "slug": slug.current,
  }
}`;
