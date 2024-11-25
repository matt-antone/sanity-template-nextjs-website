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
          p1: "mix.0.paint.title",
          p2: "mix.1.paint.title",
          p3: "mix.2.paint.title",
          p4: "mix.3.paint.title",
        },
        prepare(selection) {
          const { name, p1, p2, p3, p4 } = selection;
          const subtitle = `${p1 ? p1 : ""}${p2 ? ` / ${p2}` : ""}${p3 ? ` / ${p3}` : ""}${p4 ? ` / ${p4}` : ""}`;
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
