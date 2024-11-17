import { Rule } from "sanity";

export const title = {
  name: 'title',
  title: 'Title',
  description: 'Enter the title of the page.',
  validation: (Rule: Rule) => Rule.required(),
  type: 'string',
}