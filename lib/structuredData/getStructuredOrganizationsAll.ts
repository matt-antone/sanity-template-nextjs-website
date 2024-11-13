import { loadQuery } from "@/sanity/lib/store";
import type { SanityDocument } from "sanity";

export const getStructuredOrganizationsAll = async () => {
  const { data: organizations } = await loadQuery<SanityDocument>(
    `*[_type == "organization"]`
  );
  return organizations;
};
