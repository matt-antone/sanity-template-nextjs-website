import { defineField } from "sanity";
import { paintList } from "./paint-list-field";

export const steps = defineField({
  name: "steps",
  title: "Guide Steps",
  type: "array",
  of: [      {
    type: "object",
    fields: [
      {
        name: "step",
        title: "Step",
        type: "string",
      },
      paintList,
      {
        name: "description",
        title: "Description",
        type: "blockContent",
      },
    ],
  },
],
});
