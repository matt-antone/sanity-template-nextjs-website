import { defineField, defineType } from 'sanity'

export const vimeo = defineType({
  name: 'vimeo',
  title: 'Vimeo',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
})