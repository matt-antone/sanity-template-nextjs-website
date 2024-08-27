//File name: navigation.js
//File location: schemas/documents

import { GrNavigate } from "react-icons/gr";
import { slug } from "../fields/slug";

export const navigation = {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: GrNavigate,
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title"
          },
          slug,
          {
            name: "items",
            type: "array",
            title: "Navigation items",
            of: [{ type: "navigationItem" }]
          }
    ]
}