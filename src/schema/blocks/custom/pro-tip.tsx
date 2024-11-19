import { defineField, defineType } from "sanity";

export const proTip = defineType({
  name: "proTip",
  title: "Pro Tip",
  type: "object",
  description: 'Add a helpful tip or professional advice.',
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `Pro Tip: ${title}`,
      };
    },
  },
});
