export const image = {
  name: 'image',
  title: 'Image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (Rule:any) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
  validation: (Rule:any) => Rule.required(),
}