import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrSettingsOption } from "react-icons/gr";

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: GrSettingsOption,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    defineField({
      type: 'string',
      name: 'siteTitle',
      title: 'Site Title',
    }),
    defineField({
      type: 'text',
      name: 'siteDescription',
      title: 'Site Description',
    }),
    defineField({
      type: 'image',
      name: 'siteLogo',
      title: 'Site Logo',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
