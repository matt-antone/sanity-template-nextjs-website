import { groq } from "next-sanity";

export const PAGES_QUERY = groq`*[_type == "page" && defined(slug)]`;
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]`;

export const HOME_PAGE_QUERY = groq`*[_type == "home"][0]{
  ...,
  gallery[]{
    ...,
    asset->{
      ...,
    }
  },
}`;
