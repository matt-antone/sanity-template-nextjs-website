import type { Metadata } from "next";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { getPaginatedPosts } from "./getPaginatedPosts";
import Link from "next/link";
import Image from "next/image";
import { SanityDocument } from "next-sanity";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our latest posts.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  const { posts, total, hasMore } = await getPaginatedPosts(pageSize, page - 1);
  return (
    <Container>
      <LayoutHeading text="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: SanityDocument) => {
          console.log(post);
          return (
            <div key={post._id} className="flex flex-col">
              <Link href={`/posts/${post.slug.current}`}>
                {post.gallery?.length > 0 && post.gallery[0].asset && (
                  <div className="relative aspect-video mb-4">
                    <Image
                      src={`${post.gallery[0].asset.url}?w=250&h=250&fit=crop`}
                      alt={post.title}
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Previous
          </Link>
        )}
        {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
          <Link
            key={i}
            href={`/posts?page=${i + 1}`}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </Link>
        ))}
        {hasMore && (
          <Link
            href={`/posts?page=${page + 1}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </Link>
        )}
      </div>
    </Container>
  );
}
