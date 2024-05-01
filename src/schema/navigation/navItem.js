//File name: navItem.js
//File location: schemas/objects
import { GrNavigate } from "react-icons/gr";

export default navItem = {
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
          }
    ]
}