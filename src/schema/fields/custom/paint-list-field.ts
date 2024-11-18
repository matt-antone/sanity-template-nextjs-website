import { defineField } from "sanity";
import { FaPaintBrush } from "react-icons/fa";
export const paintList = defineField({
  name: "paintList",
  title: "Paint List",
  description: "Add a list of paints or mixes",
  icon: FaPaintBrush,
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        {
          name: "mix",
          title: "Mix",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "paint",
                  title: "Paint",
                  type: "reference",
                  to: [{ type: "paint" }],
                },
                { name: "parts", title: "Parts", type: "number" },
              ],
              preview: {
                select: {
                  paint: "paint.title",
                  parts: "parts",
                },
                prepare(selection) {
                  const { paint, parts, mfg } = selection;
                  return {
                    title: paint || "Untitled Paint",
                    subtitle: `${parts} part${parts === 1 ? "" : "s"}`,
                    media: FaPaintBrush,
                  };
                },
              },
            },
          ],
        },
      ],
      preview: {
        select: {
          name: "name",
          mix: "mix",
        },
        prepare(selection) {
          const { name, mix } = selection;
          const mixCount = mix?.length || 0;
          const subtitle =
            mixCount > 0
              ? `${mixCount} paint${mixCount === 1 ? "" : "s"} in mix`
              : "No mix";

          return {
            title: name,
            subtitle: subtitle,
            media: FaPaintBrush,
          };
        },
      },
    },
  ],
});
