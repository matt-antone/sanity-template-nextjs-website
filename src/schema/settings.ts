import { defineField, defineType } from "sanity";
import { GrSettingsOption } from "react-icons/gr";
import { localBusinessType } from "./fields/localBusinessType";
import * as fields from "./fields";
export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: GrSettingsOption,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    defineField({
      type: "string",
      name: "siteTitle",
      title: "Site Title",
    }),
    defineField({
      type: "text",
      name: "siteDescription",
      title: "Site Description",
    }),
    defineField({
      type: "image",
      name: "siteLogo",
      title: "Site Logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      type: "array",
      name: "organizations",
      title: "Organizations",
      of: [
        defineField({
          type: "object",
          name: "organization",
          title: "Organization",
          fields: [
            defineField({
              type: "string",
              name: "label",
              title: "Label",
              description: "Used to identify this organization in sanity.",
            }),
            defineField({
              type: "string",
              name: "name",
              title: "Name",
            }),
            localBusinessType,
            defineField({
              type: "url",
              name: "homepage",
              title: "Home Page URL",
            }),
            defineField({
              type: "object",
              name: "address",
              title: "Address",
              fields: [
                defineField({
                  type: "string",
                  name: "street1",
                  title: "Street",
                }),
                defineField({
                  type: "string",
                  name: "street2",
                  title: "Apartment, suite, etc.",
                }),
                defineField({
                  type: "string",
                  name: "city",
                  title: "City",
                }),
                defineField({
                  type: "string",
                  name: "state",
                  title: "State",
                }),
                defineField({
                  type: "string",
                  name: "zip",
                  title: "Zip",
                }),
              ],
            }),
            fields.phone,
            fields.email,
            fields.gallery,
          ],
          preview: {
            select: {
              title: "label",
            },
            prepare(selection) {
              return { ...selection };
            },
          },
        
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
