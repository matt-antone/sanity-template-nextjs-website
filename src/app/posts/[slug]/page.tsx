import type { Metadata, ResolvingMetadata, MetaDataProps, PostDocument } from '@/src/types'
import { POST_QUERY, POSTS_ALL_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { loadQuery } from "@/sanity/lib/store";
import Post from "@/components/LayoutPost";
import LayoutHeading from '@/components/LayoutHeading';
import Container from '@/components/Container';
import { getStructuredPost } from '@/lib/structuredData';

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Page Component
export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params;
  const initial = await loadQuery<PostDocument>(POST_QUERY, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: [params.slug],
    },
  });

  const structuredData = await getStructuredPost(initial.data, params.slug);

  return (
    <Container>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
        id="post-jsonld" 
      />
      <LayoutHeading text={initial?.data?.title || "Untitled"}/>
      <Post {...initial.data} />
    </Container>
  )
}

// Generate Static Page Slugs
export async function generateStaticParams() {
  const posts = await client.fetch<PostDocument[]>(POSTS_ALL_QUERY);
  return posts.map((post: PostDocument) => ({
    slug: post.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  const post = await client.fetch<PostDocument>(POST_QUERY, { slug },{
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

