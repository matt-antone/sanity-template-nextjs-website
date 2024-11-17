import { defineType } from 'sanity'
import * as fields from '../fields'
import { GrTag } from "react-icons/gr";


export const category = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  description: 'Add categories to the site. This will help with SEO and categorization.',
  icon: GrTag,
  fields: [
    fields.title,
  ],
})