import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`*[_type == "settings"]{
  ...,
  siteLogo{...,asset->},
}[0]`;
export const HEADER_NAVIGATION_QUERY = groq`*[_type == "navigation" && slug.current == "main-navigation"]{
  ...,
  "items": items[]{
    ...,
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

export const MOBILE_NAVIGATION_QUERY = groq`*[_type == "navigation" && slug.current == "mobile-navigation"]{
  ...,
  "items": items[]{
    ...,
    "link": navigationItemUrl.relativePath,
    "page": navigationItemUrl.internalLink->,
  },
}[0]`;
