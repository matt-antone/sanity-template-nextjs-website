import type {
  PageDocument,
  MetaDataProps,
  ResolvingMetadata,
  Metadata,
} from "@/src/types";
import { QueryParams } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PAGES_QUERY, PAGE_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import LayoutPage from "@/components/LayoutPage";
import { getStructuredPage } from "@/lib/structuredData";

export default async function NormalPage({ params }: { params: QueryParams }) {
  const initial = await loadQuery<PageDocument>(PAGE_QUERY, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: [params.slug],
    },
  });

  if (initial.data === null) {
    notFound();
  }

  const structuredData = await getStructuredPage(initial.data);

  return (
    initial.data !== null && (
      <Container>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="page-jsonld"
      />
        <LayoutPage {...initial.data} />
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
