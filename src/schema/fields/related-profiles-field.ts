export const relatedProfiles = {
  type: "array",
  name: "profiles",
  title: "Related Profiles",
  weak: true,
  description: "Optional. Select profiles for this testimonial.",
  of: [
    {
      type: "reference",
      to: [{ type: "profile" }],
    },
  ]
}