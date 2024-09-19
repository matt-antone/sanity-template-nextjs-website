import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrArticle } from "react-icons/gr";

export default defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  icon: GrArticle,
  fields: [
    fields.createdDate,
    fields.title,
    fields.slug,
    fields.excerpt,
    fields.body,
    fields.image,
    fields.categories,
    fields.tags,
    {
      type: "array",
      name: "profiles",
      title: "Related Profiles",
      of: [
        {
          type: "reference",
          to: [{ type: "profile" }],
        },
      ]
    },
    fields.gallery,
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
