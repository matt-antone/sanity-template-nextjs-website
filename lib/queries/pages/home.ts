import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`*[_type == "home"][0]{
  ...,
  gallery[]{
    ...,
    asset->{
      ...,
    }
  },
}`;