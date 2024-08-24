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
    { ...fields.url, name: "linkedin", title: "LinkedIn" },
    { ...fields.image, title: "Profile Image" },
    { ...fields.body, name: "bio", title: "Biography" },
    { ...fields.body, name: "education", title: "Education" },
    { ...fields.body, name: "membership", title: "Memberships" },
    { ...fields.body, name: "publication", title: "Publications" },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage.src",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
