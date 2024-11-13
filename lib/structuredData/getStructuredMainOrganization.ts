import type { SanityDocument } from "sanity";
import { loadQuery } from "@/sanity/lib/store";

export const getStructuredMainOrganization = async () => {
  const {
    data: { organization },
  }: any = await loadQuery<SanityDocument>(
    `*[_type == "settings"][0]{
      "organization": organizations[0]
    }`
  );
  return {
    "@type": "Organization",
    name: organization?.name || "",
    url: organization?.homepage || "",
    // sameAs: organization.sameAs,
  };
};