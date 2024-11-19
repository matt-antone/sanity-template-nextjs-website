import type { Metadata, ResolvingMetadata, MetaDataProps, PostDocument } from '@/src/types'
import { WALKTHROUGH_QUERY, WALKTHROUGHS_ALL_QUERY } from "@/lib/queries";
import { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { loadQuery } from "@/sanity/lib/store";
import Post from "@/components/LayoutPost";
import LayoutHeading from '@/components/LayoutHeading';
import Container from '@/components/Container';
import { getStructuredPost } from '@/lib/structuredData';
import LayoutWalkthrough from '@/components/custom/LayoutWalkthrough';

// Generate Static Page Slugs
export async function generateStaticParams() {
  const posts = await client.fetch<PostDocument[]>(WALKTHROUGHS_ALL_QUERY);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(
  { params: {slug}, searchParams }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await client.fetch<PostDocument>(WALKTHROUGH_QUERY, { slug },{
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: [slug],
    },
  })
  const images = []
  if (post.image) {
    images.push(post.image.asset.url)
  }
  return {
    title: post.title || null,
    description: post.description || null,
    openGraph: {
      images,
    },
  }
}



// Page Component
export default async function Page({ params }: { params: QueryParams }) {
  const initial = await loadQuery<PostDocument>(WALKTHROUGH_QUERY, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: [params.slug],
    },
  });

  const structuredData = await getStructuredPost(initial.data, params.slug);
  // console.log(initial.data);
  return (
    <Container>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} id="post-jsonld" />
      <LayoutHeading text={initial?.data?.title || "Untitled"}/>
      <LayoutWalkthrough {...initial.data} />
    </Container>
  )
}
