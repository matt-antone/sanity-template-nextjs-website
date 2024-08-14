import { SITE_SETTINGS_QUERY } from "@/src/lib/queries";
import { client } from "@/sanity/lib/client";
import type { SanityDocument } from "next-sanity";
import type { SettingsDocument } from "@/src/types";
import { headers } from 'next/headers';


export default async function getStructuredData({
  post,
}: {
  post: SanityDocument;
}) {
  const settings = await client.fetch<SettingsDocument>(SITE_SETTINGS_QUERY);
  const headersList = headers();
  const path = headersList.get('referer')?.split('/').slice(3)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${process.env.BASE_URL}/#website`,
        url: process.env.BASE_URL,
        name: settings.siteTitle || "Untitled",
        description: settings.siteDescription || "null",
        publisher: { "@id": `${process.env.BASE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${process.env.BASE_URL}/#organization`,
        name: settings.siteTitle || "Untitled",
        url: process.env.BASE_URL,
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": `${process.env.BASE_URL}/#/schema/logo/image/`,
          url: settings.siteLogo?.asset?.url,
          contentUrl: settings.siteLogo?.asset?.url,
          width: settings.siteLogo?.asset?.metadata.dimensions.width,
          height: settings.siteLogo?.asset?.metadata.dimensions.height,
          caption: settings.siteTitle || "Untitled",
        },
        image: { "@id": `${process.env.BASE_URL}/#/schema/logo/image/` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${process.env.BASE_URL}/${path?.join("/")}/#breadcrumb`,
          // "https://www.epgrlawyers.com/team-members/darren-s-enenstein/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.epgrlawyers.com/",
          },
          { "@type": "ListItem", position: 2, name: "Darren S. Enenstein" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": headersList.get('referer'),
        url: headersList.get('referer'),
        name: post.title,
        isPartOf: { "@id": `${process.env.BASE_URL}/#website` },
        about: { "@id": `${process.env.BASE_URL}/#organization` },
        datePublished: post.date,
        dateModified: post._updatedAt,
        description: post.description,
        breadcrumb: { "@id": `${process.env.BASE_URL}/#breadcrumb` },
        inLanguage: "en-US",
        potentialAction: [
          { "@type": "ReadAction", target: [`${process.env.BASE_URL}/`] },
        ],
      },
    ],
  };
  return structuredData;
}
