export const sections = {
  name: "sections",
  title: "Sections",
  description: 'Add content sections to the page.',
  type: "array",
  of: [
    {
      type: "object",
      name: "section",
      title: "Section",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
        },
        {
          name: "content",
          type: "blockContent",
          title: "Content",
        },
      ],
    },
  ],
}