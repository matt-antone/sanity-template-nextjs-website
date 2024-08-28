import { loadQuery } from "@/sanity/lib/store";
import type { SanityDocument } from "sanity";

export const getStructuredPage = async (
  page: any,
  section?: string
) => {
  // Get the organization
  const organization = await getStructuredMainOrganization();
  console.log(organization);
  return page ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description || "",
    url: section
      ? `https://www.sanity.io/${section}/${page.slug.current}`
      : `https://www.sanity.io/${page?.slug?.current}`,
    publisher: organization,
  } : null;
};

export const getStructuredPost = async (post: any, section?: string) => {
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
      ? `https://www.sanity.io/${section}/${post.slug.current}`
      : `https://www.sanity.io/${post?.slug?.current}`,
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
    ? `https://www.sanity.io/${section}/${person.slug.current}`
    : `https://www.sanity.io/${person?.slug?.current}`,
    sameAs: person.sameAs,
  };
};

export const getStructuredMainOrganization = async () => {
  const { data: {organization} }:any = await loadQuery<SanityDocument>(
    `*[_type == "settings"][0]{
      "organization": organizations[0]
    }`
  );
  console.log(organization);
  return {
    "@context": "https://schema.org",
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
