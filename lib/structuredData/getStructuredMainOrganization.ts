import type { SanityDocument } from "sanity";
import { loadQuery } from "@/sanity/lib/store";

export const getStructuredMainOrganization = async () => {
  const {
    data,
  }: any = await loadQuery<SanityDocument>(
    `*[_type == "settings"][0]{
      "organization": organizations[0]
    }`
  );
  return data?.organization && {
    "@type": "Organization",
    name: data.organization?.name || "",
    url: data.organization?.homepage || "",
    // sameAs: organization.sameAs,
  };
};