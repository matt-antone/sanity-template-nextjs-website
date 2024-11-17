import { defineType } from 'sanity'
import * as fields from '../fields'
import { RiPagesLine } from "react-icons/ri";

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  description: 'Add a page to the site.',
  icon: RiPagesLine,
  fields: [
    fields.date,
    fields.title,
    fields.slug,
    fields.description,
    fields.body,
    fields.gallery,
    fields.relatedProfiles,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
  },
})
