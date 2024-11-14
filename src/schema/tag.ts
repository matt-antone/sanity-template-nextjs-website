import { defineType } from 'sanity'
import * as fields from './fields'
import { GrTag } from "react-icons/gr";


export default defineType({
  name: 'tag',
  title: 'Tags',
  type: 'document',
  description: 'Add tags to the site. This will help with SEO and categorization.',
  icon: GrTag,
  fields: [
    {...fields.title, description: 'Enter the tag.'},
  ],
})