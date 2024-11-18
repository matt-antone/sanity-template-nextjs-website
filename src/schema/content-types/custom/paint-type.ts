import { defineType } from 'sanity'
import * as fields from '../../fields'
import { GrArticle } from "react-icons/gr";
import { FaPaintBrush } from "react-icons/fa";

export const paint = defineType({
  name: 'paint',
  title: 'Paint',
  type: 'document',
  description: 'Add a paint to the site.',
  icon: FaPaintBrush,
  fields: [
    fields.title,
    fields.slug,
    {
      name: "color",
      title: "Color",
      type: "color",
    },
    {
      name: "mfg",
      title: "Manufacturer",
      type: "string",
      options: {
        list: [
          {title: "ProAcryl", value: "proacryl"},
          {title: "AK", value: "ak"},
          {title: "Army Painter", value: "army_painter"},
          { title: "Citadel", value: "citadel"},
          { title: "Vallejo", value: "vallejo"},
          { title: "Scale75", value: "scale75"},
        ],
      },
    },
    fields.tags,
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     media: 'gallery.0.asset',
  //   },
  // },
})
