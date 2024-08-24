import { type Rule } from "sanity"
export const slug = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  validation: (Rule:Rule) => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96,
  },
}