import type { Metadata } from "next";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import { getPaginatedPosts } from "./getPaginatedPosts";
import Link from "next/link";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import HexagonImage from "@/components/custom/HexagonImage";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our latest posts.",
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  const { posts, total, hasMore } = await getPaginatedPosts(pageSize, page - 1);
  return (
    <Container>
      <LayoutHeading text="Guides" />
      <PostList posts={posts} slug="guides" />
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
