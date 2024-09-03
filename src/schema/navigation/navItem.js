//File name: navItem.js
//File location: schemas/objects
import { GrNavigate } from "react-icons/gr";

export const navItem = {
    name: 'navigationItem',
    title: 'Navigation Item',
    type: 'object',
    icon: GrNavigate,
    fields: [
          {
            name: "text",
            type: "string",
            title: "Navigation Text"
          },
          {
            name: "navigationItemUrl",
            type: "navLink", 
            title: "Navigation Item URL"
          },
          {
            name: "children",
            type: "array",
            title: "Dropdown Items",
            of: [{ type: "navigationItem" }],
            description: "Optional sub-navigation items",
          }
    ]
}