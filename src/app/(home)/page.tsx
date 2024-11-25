import type { PageDocument, Metadata } from "@/src/types";
import { loadQuery } from "@/sanity/lib/store";
import { HOME_PAGE_QUERY } from "@/lib/queries";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import { getStructuredPage } from "@/lib/structuredData";
import FlexCol from "@/components/FlexCol";
import Hero from "@/components/custom/Hero";
import LayoutHeading from "@/components/LayoutHeading";
import LayoutPage from "@/components/LayoutPage";
import HexagonImage from "@/components/custom/HexagonImage";
import { SanityDocument } from "@sanity/client";
import Hexagon from "@/components/custom/Hexagon";
import PostList from "@/components/PostList";
import PageTransition from "@/components/PageTransition";
import LayoutPost from "@/components/LayoutPost";
import HexImageGrid from "@/components/custom/HexImageGrid";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our site.",
};

export default async function Page() {
  // Load home page
  const { data } = await loadQuery<PageDocument>(
    HOME_PAGE_QUERY,
    { slug: "home" },
    {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
        tags: ["home", "posts"],
      },
    }
  );

  const structuredData = await getStructuredPage(data);

  if (data === null) {
    notFound();
  }
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="post-jsonld"
      />
      <div className="opacity-30 absolute z-0 top-0 bottom-0 w-full overflow-hidden from-slate-200 to-white bg-gradient-to-b">
          { data.images && <HexImageGrid images={data.images} /> }
          {/* {data.images &&
            data.images?.map((image: SanityDocument, index: number) => {
              console.log(image);
              return (
                <>
                  {Array.from({ length: Math.random() * 5 }).map((_, index) => (
                    
                    <Hexagon
                      key={index}
                      className={`w-full h-auto even:translate-y-1/2 fill-slate-400 translate-x-[-1.5rem]`}
                      color=""
                    />
                  ))}
                  <HexagonImage
                    key={image._id}
                    image={{ asset: image }}
                    className={`w-full h-auto even:translate-y-1/2 translate-x-[-1.5rem]`}
                  />
                </>
              );
            })} */}
      </div>
      <PageTransition>
        <div className="relative z-10">
          <Container>
            <Hero image={data.gallery[0]} />
            <LayoutPost post={data} />
            <FlexCol>
              <LayoutHeading
                text={data.title || "Welcome to our site."}
                breadcrumbs={false}
              />
              <LayoutPage {...data} />
              <PostList
                posts={data.posts}
                slug="posts"
                className="md:grid-cols-3  max-w-[75ch]"
                title="Latest Posts"
              />
              <PostList
                posts={data.guides}
                slug="guides"
                className="md:grid-cols-3  max-w-[75ch]"
                title="Guides"
              />
            </FlexCol>
          </Container>
        </div>
      </PageTransition>
    </>
  );
}
