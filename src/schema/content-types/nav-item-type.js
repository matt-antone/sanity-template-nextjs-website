import { defineType } from "sanity";
import { GrNavigate } from "react-icons/gr";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  icon: GrNavigate,
  fields: [
    {
      name: "text",
      type: "string",
      title: "Navigation Text",
      description: "Enter the text for the navigation item.",
    },
    {
      name: "navigationItemUrl",
      type: "string",
      title: "URL",
      description: "Use a relative path for internal links or a full URL for external links.",
    },
    {
      name: "children",
      type: "array",
      title: "Dropdown Items",
      description: "Add dropdown items to the navigation item.",
      of: [{ type: "navItem" }],
    },
  ],
});
