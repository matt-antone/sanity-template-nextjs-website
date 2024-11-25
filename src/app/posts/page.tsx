import type { Metadata } from "next";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { getPaginatedPosts } from "./getPaginatedPosts";
import Link from "next/link";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import HexagonImage from "@/components/custom/HexagonImage";
import { motion } from "framer-motion";
import PostList from "@/components/PostList";
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

  const pageSize = 12;

  const { posts, total, hasMore } = await getPaginatedPosts(pageSize, page - 1);
  return (
    <Container>
      <LayoutHeading text="Posts" />
      <PostList posts={posts} slug="posts" />
        {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {posts.map((post: SanityDocument) => {
            return (
              <motion.div 
                key={post._id} 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href={`/posts/${post.slug.current}`}>
                  {post.gallery?.length > 0 && post.gallery[0].asset && (
                    <div className="relative aspect-video mb-4">
                      <HexagonImage
                        image={post.gallery[0]}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <time className="text-sm text-center mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <h2 className="lg:text-lg font-bold mb-2 text-center line-clamp-3">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 text-center">{post.excerpt}</p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div> */}
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
