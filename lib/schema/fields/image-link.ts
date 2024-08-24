import { type Rule } from "sanity";
export const linkImage = ({
  type: 'image',
  name: 'linkImage',
  title: 'Image',
  preview: {
    select: {
      alt: 'alt',
      media: 'asset',
    },
    prepare(selection:any) {
      const { alt, caption, media } = selection
      return {
        title: alt,
        subtitle: caption,
        media,
      }
    },
  },
  fields: [
    {
      title: "Alt Text",
      name: "alt",
      type: "string",
      validation: (Rule:Rule) => Rule.custom((alt, context:any) => {
        if (context.parent?.asset && !alt) {
          return "Alt text is required when an image is present"
        }
        return true
      }),
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      description: ``,
    }
  ],
})