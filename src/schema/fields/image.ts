export const image = {
  name: "image",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Alternative text for screen readers. Usually a short summary of the image.",
      validation: (Rule: any) =>
        Rule.custom((alt:any, context:any) =>
        {
          const message = "Alt text is required when an image is present"
          console.log(alt, context.document.asset)
          return context.document.image ? alt !== "undefined" ? message : true : message;
        }
        ),
    },
    // {
    //   name: "caption",
    //   title: "Caption",
    //   type: "string",
    // },
  ],
  // validation: (Rule: any) => Rule.required(),
};
