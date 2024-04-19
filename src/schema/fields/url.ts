export const url = {
  name: "url",
  title: "URL",
  type: "url",
  description: "Enter the URL.",
  validation: (Rule: any) =>
    Rule.uri({
      scheme: ["http", "https"],
    }),
};
