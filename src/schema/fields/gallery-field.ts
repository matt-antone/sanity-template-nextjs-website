export const gallery = {
  name: 'gallery',
  title: 'Gallery',
  type: 'array',
  of: [{
    type: 'image',
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
  }],
  description: 'Add images to the gallery.'
} 