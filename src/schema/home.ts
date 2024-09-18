import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrDocument } from "react-icons/gr";

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: GrDocument,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    fields.createdDate,
    fields.title,
    fields.excerpt,
    fields.body,
    fields.sections,
    fields.gallery,
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
