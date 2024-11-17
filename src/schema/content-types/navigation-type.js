import { defineType } from "sanity";
import { GrNavigate } from "react-icons/gr";
import { slug } from "../fields";

export const navigation = defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: GrNavigate,
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
            description: 'Enter the title of the menu.'
          },
          slug,
          {
            name: "items",
            type: "array",
            title: "Navigation items",
            description: 'Add the items to the menu.',
            of: [{ type: "navItem" }]
          }
    ]
})