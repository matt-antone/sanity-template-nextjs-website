import { SITE_SETTINGS_QUERY } from "@/src/lib/queries";
import { client } from "@/sanity/lib/client";
import type { SanityDocument } from "next-sanity";
import type { SettingsDocument } from "@/src/types";
import { headers } from 'next/headers';
import capitalize from "@/src/lib/capitalize";


export default async function getStructuredData({
  post,
}: {
  post: SanityDocument;
}) {
  const settings = await client.fetch<SettingsDocument>(SITE_SETTINGS_QUERY);
  const headersList = headers();
  const currentPath = headersList.get('x-current-path');
  const rawPath = currentPath?.replace(process.env.BASE_URL || "", '') || '';
  const path = rawPath?.split('/') || []
  const breadcrumbs = path && path.map( (item:string, i:number) => ({
    "@type": "ListItem",
    position: i + 2,
    name: i+1 == path.length ? post.title : item.split('-').map(capitalize).join(' '),
    item: `${process.env.BASE_URL}/${item}`,
  }))
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": currentPath,
        url: currentPath,
        name: post.title,
        isPartOf: { "@id": `${process.env.BASE_URL}/#website` },
        // about: { "@id": `${process.env.BASE_URL}/#organization` },
        datePublished: post.date,
        dateModified: post._updatedAt,
        description: post.description,
        breadcrumb: { "@id": `${currentPath}/#breadcrumb` },
        inLanguage: "en-US",
        potentialAction: [
          { "@type": "ReadAction", target: [`${currentPath}/`] },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentPath}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: process.env.BASE_URL,
          },
          ...breadcrumbs,
        ],
      },
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
    ],
  };
  return structuredData;
}
