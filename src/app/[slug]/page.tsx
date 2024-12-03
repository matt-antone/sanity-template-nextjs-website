import type {
  PageDocument,
  MetaDataProps,
  ResolvingMetadata,
  Metadata,
} from "@/src/types";
import { loadQuery } from "@/sanity/lib/store";
import { PAGES_QUERY, PAGE_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import LayoutPage from "@/components/LayoutPage";
import { getStructuredPage } from "@/lib/structuredData";


type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function NormalPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const initial = await loadQuery<PageDocument>(PAGE_QUERY, { slug: params.slug }, {
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
  return pages.map((page: PageDocument) => ({
    slug: page.slug.current,
  }));
}

// Generate Metadata
export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
 
  const post = await client.fetch<PageDocument>(PAGE_QUERY, { slug: params.slug });
  const images = [];
  if (post?.image) {
    images.push(post.image.asset.url);
  }
  return post
    ? {
        title: post.title || null,
        description: post.description || null,
        openGraph: {
          images,
        },
      }
    : {};
}
