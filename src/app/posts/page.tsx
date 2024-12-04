import type { Metadata } from "next";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { getPaginatedPosts } from "./getPaginatedPosts";
import Link from "next/link";
import Image from "next/image";
import { PostDocument } from "@/src/types";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our latest posts.",
};

export default async function BlogPage(
  props: {
    searchParams: Promise<{ page?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  const { posts, total, hasMore } = await getPaginatedPosts(pageSize, page - 1);
  return (
    <Container>
      <LayoutHeading text="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: PostDocument) => {
          return (
            <div key={post._id} className="flex flex-col">
              <Link href={`/posts/${post.slug.current}`}>
                {post.gallery?.length > 0 && post.gallery[0].asset && (
                  <div className="relative aspect-video mb-4">
                    <Image
                      src={`${post.gallery[0].asset.url}?w=250&h=250&fit=crop`}
                      alt={post.gallery[0].altText || post.gallery[0].alt || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                )}

                <time>{new Date(post.date).toLocaleDateString()}</time>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {page > 1 && (
          <Link
            href={`/posts?page=${page - 1}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Previous
          </Link>
        )}
        {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
          <Link
            key={i}
            href={`/posts?page=${i + 1}`}
            className={buttonVariants({
              variant: page === i + 1 ? "default" : "outline",
            })}
          >
            {i + 1}
          </Link>
        ))}
        {hasMore && (
          <Link
            href={`/posts?page=${page + 1}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Next
          </Link>
        )}
      </div>
    </Container>
  );
}
