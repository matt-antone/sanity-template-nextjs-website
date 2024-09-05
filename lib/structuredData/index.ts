import { loadQuery } from "@/sanity/lib/store";
import type { SanityDocument } from "sanity";

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

export const getStructuredPost = async (post: any, section?: string | null) => {
  const organization = await getStructuredMainOrganization();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    name: post.title || "",
    description: post.description || "",
    publisher: organization || null,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": section
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/${section}/${post.slug.current}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/${post?.slug?.current}`,
    },
  };
};

export const getStructuredPerson = async (person: any, section?: string) => {
  // get profile from sanity type profile
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.title,
    url: section
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${section}/${person.slug.current}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/${person?.slug?.current}`,
    sameAs: person.sameAs,
  };
};

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

export const getStructuredAllOrganizations = async () => {
  const { data: organizations } = await loadQuery<SanityDocument>(
    `*[_type == "organization"]`
  );
};
