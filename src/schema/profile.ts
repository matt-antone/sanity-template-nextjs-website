import { defineType } from "sanity";
import * as fields from "./fields";
import { FaPerson } from "react-icons/fa6";

export default defineType({
  name: "profile",
  title: "Profiles",
  type: "document",
  icon: FaPerson,
  fields: [
    fields.createdDate,
    fields.title,
    fields.slug,
    fields.excerpt,
    fields.email,
    { ...fields.image, title: "Thumbnail", name: "thumbnail" },
    { ...fields.image, title: "Profile Image", name: "profileImage" },
    {
      type: "array",
      name: "socialLinks",
      title: "Social Links",
      of: [
        {
          type: "object",
          fields: [
            { ...fields.url, name: "label", title: "Label" },
            { ...fields.url, name: "url", title: "URL" },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "sections",
      title: "Sections",
      of: [
        {
          type: "object",
          fields: [
            { ...fields.title, name: "heading", title: "Heading" },
            { ...fields.body, name: "content", title: "Content" },
          ],
        },
  ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thubmnail",
    },
    // prepare(selection) {
    //   const { author } = selection;
    //   return { ...selection, subtitle: author && `by ${author}` };
    // },
  },
});
