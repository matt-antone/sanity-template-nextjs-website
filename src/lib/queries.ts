// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

export const PAGES_QUERY = groq`*[_type == "page" && defined(slug)]`;
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]`;

export const POSTS_ALL_QUERY = groq`*[_type == "posts" && defined(slug)]  | order(date desc) {
  slug,
}`;

export const POSTS_QUERY = groq`*[_type == "posts" && defined(slug)]  | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`;

export const PAGINATION_QUERY = groq`*[_type == "posts" && date < $lastDate] | order(date desc) [0...4] {
  ...,
  image{...,asset->},
}`

export const POST_QUERY = groq`*[_type == "posts" && slug.current == $slug]{
  ...,
  image{...,asset->},
}[0]`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "settings"]{
  ...,
  siteLogo{...,asset->},
}[0]`;
export const HEADER_NAVIGATION_QUERY = groq`*[_type == "navigation" && slug.current == "main-navigation"]{
  ...,
  "items": items[]{
    ...,
    "link": navigationItemUrl.relativePath,
    "page": navigationItemUrl.internalLink->,
  },
}[0]`;
export const FOOTER_NAVIGATION_QUERY = groq`*[_type == "navigation" && slug.current == "footer-navigation"]{
  ...,
  "items": items[]{
    ...,
    "link": navigationItemUrl.relativePath,
    "page": navigationItemUrl.internalLink->,
  },
}[0]`;

export const SITEMAP_QUERY = groq`{
  "pages": *[_type == "page"]{
    title,
    date,
    "slug": slug.current,
  }|order(title asc),
  "posts": *[_type == "posts"]|order(date desc){
    title,
    date,
    _updatedAt,
    "slug": slug.current,
  }
}`;
