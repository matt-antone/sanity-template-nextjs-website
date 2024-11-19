import { groq } from "next-sanity";

export const WALKTHROUGH_QUERY = groq`*[_type == "walkthrough" && slug.current == $slug]{
  ...,
  gallery[]{...,asset->},
  walkthroughSteps[]{...,paintList[]{...,mix[]{...,paint->}}},
}[0]`;
