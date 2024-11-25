import type {
  Metadata,
  ResolvingMetadata,
  MetaDataProps,
  PostDocument,
} from "@/src/types";
import { GUIDE_QUERY, GUIDES_ALL_QUERY } from "@/lib/queries";
import { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { loadQuery } from "@/sanity/lib/store";
import LayoutPost from "@/components/LayoutPost";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { getStructuredPost } from "@/lib/structuredData";
import FlexCol from "@/components/FlexCol";
import Hero from "@/components/custom/Hero";
import { notFound } from "next/navigation";
import HexagonImage from "@/components/custom/HexagonImage";

// Generate Static Page Slugs
export async function generateStaticParams() {
  const posts = await client.fetch<PostDocument[]>(GUIDES_ALL_QUERY);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(
  { params: { slug }, searchParams }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await client.fetch<PostDocument>(
    GUIDE_QUERY,
    { slug },
    {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
        tags: [slug],
      },
    }
  );
  const images = [];
  if (post.image) {
    images.push(post.image.asset.url);
  }
  return {
    title: post.title || null,
    description: post.description || null,
    openGraph: {
      images,
    },
  };
}

// Page Component
export default async function Page({ params }: { params: QueryParams }) {
  const { data } = await loadQuery<PostDocument>(GUIDE_QUERY, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: [params.slug],
    },
  });

  if (!data) {
    notFound();
  }

  const structuredData = await getStructuredPost(data, params.slug);

  return (
    <div>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="post-jsonld"
      />
      <Container>
        <Hero image={data.gallery[0]} />
        <LayoutHeading text={data?.title || "Untitled"} />
        <LayoutPost {...data} />
      </Container>
    </div>
  );
}
