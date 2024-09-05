import { defineField, defineType } from "sanity";
import ReactPlayer from "react-player";
import { Box } from "@sanity/ui";

export const youtube = defineType({
  name: "youtube",
  title: "Youtube",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    block: (props: any) => {
      return props.renderDefault({
        ...props,
        renderPreview: () => {
          return (
            <Box padding={2}>
              <p style={{ fontSize: 12, marginTop: 0 }}>YouTube Preview</p>
              {props?.value?.url ? (
                <ReactPlayer {...props.value} width={320} height={180} />
              ) : (
                <p>Please enter a url.</p>
              )}
            </Box>
          );
        },
      });
    },
  },
});
