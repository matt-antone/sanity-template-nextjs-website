import { groq } from "next-sanity";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{
  ...,
  gallery[]{...,asset->},
}[0]`;