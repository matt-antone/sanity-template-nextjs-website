import { defineType } from 'sanity'
import * as fields from '../fields'
import { GrHome} from "react-icons/gr";

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: GrHome,
  description: 'The home page of the site.',
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    fields.date,
    fields.title,
    fields.description,
    fields.body,
    fields.sections,
    fields.gallery,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
  },
})
