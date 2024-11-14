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
            title: "Navigation Text",
            description: 'Enter the text for the navigation item.'
          },
          {
            name: "navigationItemUrl",
            type: "navLink", 
            title: "Navigation Item URL",
            description: 'Select the link for the navigation item.'
          },
          {
            name: "children",
            type: "array",
            title: "Dropdown Items",
            description: 'Add dropdown items to the navigation item.',
            of: [{ type: "navigationItem" }],
            description: "Optional sub-navigation items",
          }
    ]
}