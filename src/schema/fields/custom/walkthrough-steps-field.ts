import { defineField } from "sanity";
import { paintList } from "./paint-list-field";

export const walkthroughStepsField = defineField({
  name: "walkthroughSteps",
  title: "Walkthrough Steps",
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
