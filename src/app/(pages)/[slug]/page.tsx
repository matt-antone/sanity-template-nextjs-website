import type {
  PageDocument,
  MetaDataProps,
  ResolvingMetadata,
  Metadata,
} from "@/src/types";
import { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/store";
import { PAGES_QUERY, PAGE_QUERY } from "@/lib/queries";
import Page from "@/components/Page";
import { client } from "@/sanity/lib/client";
import ContentLayout from "@/components/ContentLayout";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { notFound } from "next/navigation";

export default async function NormalPage({ params }: { params: QueryParams }) {
  const initial = await loadQuery<PageDocument>(PAGE_QUERY, params, {
    next: {
      revalidate: 2.628e9,
    },
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  if (initial.data === null) {
    notFound();
  }

  return (
    initial.data !== null && (
      <Container>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="page-jsonld"
      /> */}

        <LayoutHeading text={initial.data.title || "Untitled"} />
        <ContentLayout widgets={null}>
          <Page {...initial.data} />
        </ContentLayout>
      </Container>
    )
  );
}

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
  if (post?.image) {
    images.push(post.image.asset.url);
  }
  return post
    ? {
        title: post.title || null,
        description: post.excerpt || null,
        openGraph: {
          images,
        },
      }
    : {};
}
