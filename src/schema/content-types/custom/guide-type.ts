import { defineType } from 'sanity'
import * as fields from '../../fields'
import { GrArticle } from "react-icons/gr";

export const guide = defineType({
  name: 'guide',
  title: 'Guides',
  type: 'document',
  description: 'Add a guide to the site.',
  icon: GrArticle,
  fields: [
    fields.date,
    fields.title,
    fields.slug,
    fields.description,
    fields.body,
    fields.steps,
    fields.categories,
    fields.tags,
    fields.relatedProfiles,
    fields.gallery,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
  },
})