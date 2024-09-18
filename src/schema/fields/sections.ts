export const sections = {
  name: "sections",
  title: "Sections",
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