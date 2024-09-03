//File name: link.js
//File location: schemas/navigation

export const link = {
  name: "navLink",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "relativePath",
      type: "string",
      title: "Relative Path",
      description: "Use relative paths for internal links like /blog/ ",
    },
    {
      name: "externalUrl",
      title: "External URL",
      description: "Use fully qualified URLS for external link",
      type: "url",
    },
  ],
};
