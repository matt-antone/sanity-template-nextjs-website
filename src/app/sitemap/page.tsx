import type { Metadata } from "next";
import { QueryParams, SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { SITEMAP_QUERY } from "@/lib/queries";
import Container from "@/components/Container";
import LayoutHeading from "@/components/LayoutHeading";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All the content available on our site",
};

export default async function Page({ params }: { params: QueryParams }) {
  const {
    data: { posts, pages },
  } = await loadQuery<SanityDocument>(SITEMAP_QUERY,{},{
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      tags: ["sitemap"],
    },
  }
);
  return (
    <Container>
      <LayoutHeading text="Sitemap" />
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl mb-4">Pages</h2>
          <ul className="mb-8">
            {pages &&
              pages.map((page: any) => {
                return (
                  <li key={`${page._id}-sitemap`} className="mb-4 block">
                    <a href={`/${page.slug}`}>{page.title}</a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h2 className="text-xl mb-4">Posts</h2>
          <ul className="mb-8">
            {posts &&
              posts.map((post: any) => {
                return (
                  <li key={`${post._id}-sitemap`} className="mb-4 block">
                    <a href={`/posts/${post.slug}`}>{post.title}</a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
