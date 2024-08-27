import { validation } from "sanity";
import { type Rule } from "sanity";

export const clientLogo = {
  title: "Client Logo",
  name: "clientLogo",
  type: "image",
  validation: (Rule:Rule) => Rule.required(),
  options: {
    hotspot: true,
    captionField: 'caption', 
  },
}