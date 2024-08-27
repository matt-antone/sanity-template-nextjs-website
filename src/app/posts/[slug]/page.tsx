import type { Metadata, ResolvingMetadata, MetaDataProps, PostDocument } from '@/src/types'
import { POST_QUERY, POSTS_ALL_QUERY } from "@/lib/queries";
import { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { loadQuery } from "@/sanity/lib/store";
import Post from "@/components/Post";
import LayoutHeading from '@/components/LayoutHeading';
import Container from '@/components/Container';

// Generate Static Page Slugs
export async function generateStaticParams() {
  const posts = await client.fetch<PostDocument[]>(POSTS_ALL_QUERY);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(
  { params: {slug}, searchParams }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await client.fetch<PostDocument>(POST_QUERY, { slug })
  const images = []
  if (post.image) {
    images.push(post.image.asset.url)
  }
  return {
    title: post.title || null,
    description: post.excerpt || null,
    openGraph: {
      images,
    },
  }
}

// Page Component
export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<PostDocument>(POST_QUERY, params, {
    // Because of Next.js, RSC and Dynamic Routes this currently
    // cannot be set on the loadQuery function at the "top level"
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  return (
    <Container>
      <LayoutHeading text={initial?.data?.title || "Untitled"}/>
      <Post {...initial.data} />
    </Container>
  )
}
