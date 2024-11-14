export const tags = {
  title: "Tags",
  name: "tags",
  description: 'Add tags to the page. This will help with SEO and categorization.',
  type: "array",
  weak: true,
  of: [
    {
      type: "reference",
      to: [{ type: "tag" }],
    },
  ],
  options: {
    layout: "tags",
  },
}