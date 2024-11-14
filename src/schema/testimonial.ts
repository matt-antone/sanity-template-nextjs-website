import { defineType } from 'sanity'
import * as fields from './fields'
import { GrBlockQuote } from "react-icons/gr";

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  description: 'Add a testimonial to the site.',
  icon: GrBlockQuote,
  fields: [
    fields.date,
    fields.title,
    fields.body,
    {
      type: "text",
      name: "cite",
      title: "Citation",
    },
    fields.url,
    fields.relatedProfiles,
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
