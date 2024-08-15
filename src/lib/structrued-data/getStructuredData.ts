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

const sample = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/",
      "url": "https://www.epgrlawyers.com/practiceareas/appellate-law/",
      "name": "Appellate Law - Practice Area - EPGR Lawyers",
      "isPartOf": { "@id": "https://www.epgrlawyers.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/#primaryimage"
      },
      "image": {
        "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/#primaryimage"
      },
      "thumbnailUrl": "https://www.epgrlawyers.com/wp-content/uploads/2019/07/Appellate_Law.jpg",
      "datePublished": "2019-06-27T17:06:23+00:00",
      "dateModified": "2023-08-01T12:05:12+00:00",
      "description": "Appellate Law - Practice Area - EPGR Lawyers - https://www.epgrlawyers.com/",
      "breadcrumb": {
        "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/#breadcrumb"
      },
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://www.epgrlawyers.com/practiceareas/appellate-law/"]
        }
      ]
    },
    {
      "@type": "ImageObject",
      "inLanguage": "en-US",
      "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/#primaryimage",
      "url": "https://www.epgrlawyers.com/wp-content/uploads/2019/07/Appellate_Law.jpg",
      "contentUrl": "https://www.epgrlawyers.com/wp-content/uploads/2019/07/Appellate_Law.jpg",
      "width": 752,
      "height": 359,
      "caption": "Appellate_Law"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.epgrlawyers.com/practiceareas/appellate-law/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.epgrlawyers.com/"
        },
        { "@type": "ListItem", "position": 2, "name": "Appellate Law" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.epgrlawyers.com/#website",
      "url": "https://www.epgrlawyers.com/",
      "name": "EPGR Lawyers",
      "description": "Thinking Outside the Box",
      "publisher": { "@id": "https://www.epgrlawyers.com/#organization" },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.epgrlawyers.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://www.epgrlawyers.com/#organization",
      "name": "EPGR Lawyers",
      "url": "https://www.epgrlawyers.com/",
      "logo": {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": "https://www.epgrlawyers.com/#/schema/logo/image/",
        "url": "https://www.epgrlawyers.com/wp-content/uploads/2022/05/cropped-EPG_logo.png",
        "contentUrl": "https://www.epgrlawyers.com/wp-content/uploads/2022/05/cropped-EPG_logo.png",
        "width": 240,
        "height": 49,
        "caption": "EPGR Lawyers"
      },
      "image": { "@id": "https://www.epgrlawyers.com/#/schema/logo/image/" }
    }
  ]
}



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
  return sample;
}
