export const image = {
  name: "image",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Add a caption to the image.'
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Important for SEO and accessibility.'
    },
    {
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
      description: 'Add attribution for the image if needed.'
    }
  ]
};
