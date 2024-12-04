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
        ? `${process.env.VERCEL_PRODUCTION_URL}/${section}/${post.slug.current}`
        : `${process.env.VERCEL_PRODUCTION_URL}/${post?.slug?.current}`,
    },
  };
};
