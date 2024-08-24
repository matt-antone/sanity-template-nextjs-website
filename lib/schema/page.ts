import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrDocument } from "react-icons/gr";

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: GrDocument,
  fields: [
    fields.createdDate,
    fields.title,
    fields.slug,
    fields.excerpt,
    fields.body,
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage.src',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
