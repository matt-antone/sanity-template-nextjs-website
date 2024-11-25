import { groq } from "next-sanity";

export const GUIDE_QUERY = groq`*[_type == "guide" && slug.current == $slug]{
  ...,
  gallery[]{...,asset->},
  steps[]{...,paintList[]{...,mix[]{...,paint->}}},
}[0]`;
