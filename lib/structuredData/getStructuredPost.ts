import { getStructuredMainOrganization } from "./getStructuredMainOrganization";

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
