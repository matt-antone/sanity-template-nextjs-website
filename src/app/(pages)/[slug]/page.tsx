// ./app/[slug]/page.tsx
import type {
  PageDocument,
  MetaDataProps,
  ResolvingMetadata,
  Metadata,
} from "@/src/types";
import { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { loadQuery } from "@/sanity/lib/store";
import { PAGES_QUERY, PAGE_QUERY } from "@/src/lib/queries";
import Page from "@/src/components/Page";
import PagePreview from "@/src/components/PagePreview";
import { client } from "@/sanity/lib/client";
import Main from "@/src/components/Main";
import Container from "@/src/components/Container";
import LayoutFull from "@/src/components/LayoutFull";
import LayoutHeading from "@/src/components/LayoutHeading";

// Generate Static Page Slugs
export async function generateStaticParams() {
  const pages = await client.fetch<PageDocument[]>(PAGES_QUERY);
  return pages.map((page) => ({
    slug: page.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(
  { params: { slug }, searchParams }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await client.fetch<PageDocument>(PAGE_QUERY, { slug });
  const images = [];
  if (post.image) {
    images.push(post.image.asset.url);
  }
  return {
    title: post.title || null,
    description: post.excerpt || null,
    openGraph: {
      images,
    },
  };
}

export default async function NormalPage({ params }: { params: QueryParams }) {
  const initial = await loadQuery<PageDocument>(PAGE_QUERY, params, {
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  return (
    <LayoutFull>
      <LayoutHeading text={initial.data.title || "Untitled"}/>
      <Page {...initial.data} />
    </LayoutFull>
  );
}
