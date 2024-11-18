import { defineType } from 'sanity'
import * as fields from '../../fields'
import { GrArticle } from "react-icons/gr";

export const walkthrough = defineType({
  name: 'walkthrough',
  title: 'Walkthrough',
  type: 'document',
  description: 'Add a walkthrough to the site.',
  icon: GrArticle,
  fields: [
    fields.date,
    fields.title,
    fields.slug,
    fields.description,
    fields.body,
    fields.walkthroughStepsField,
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
