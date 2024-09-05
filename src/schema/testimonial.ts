import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrArticle } from "react-icons/gr";

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: GrArticle,
  fields: [
    fields.createdDate,
    fields.title,
    fields.body,
    {
      type: "text",
      name: "cite",
      title: "Citation",
    },
    {
      type: "array",
      name: "profiles",
      title: "Related Profiles",
      description: "Optional. Select profiles for this testimonial.",
      of: [
        {
          type: "reference",
          to: [{ type: "profile" }],
        },
      ]
    },
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
