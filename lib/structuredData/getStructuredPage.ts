import { getStructuredMainOrganization } from "./getStructuredMainOrganization";

export const getStructuredPage = async (page: any, section?: string | null) => {
  // Get the organization
  const organization = await getStructuredMainOrganization();
  return page && organization
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        description: page.description || "",
        url: section
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/${section}/${page.slug.current || ""}`
          : page.slug 
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${page?.slug?.current}` 
            : process.env.NEXT_PUBLIC_BASE_URL || "",
        publisher: organization,
      }
    : null;
};