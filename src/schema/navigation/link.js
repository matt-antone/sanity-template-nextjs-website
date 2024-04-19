//File name: link.js
//File location: schemas/navigation

export default {
  name: 'navLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
    title: 'Internal Link',
    name: 'internalLink',
    description: 'Select pages for navigation',
    type: 'reference',
    to: [{ type: 'page' }], 
    },
    {
      name: "relativePath",
      type: "string",
      title: "Relative Path"
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      description:"Use fully qualified URLS for external link",
      type: 'url',
    },
  ]
};