import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrTag } from "react-icons/gr";


export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: GrTag,
  fields: [
    fields.title,
  ],
})