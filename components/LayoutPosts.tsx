"use client";
import { useState } from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { PAGINATION_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { Button, buttonVariants } from "@/components/ui/button";

export default function LayoutPosts({ posts }: { posts: SanityDocument[] }) {
  const [list, setList] = useState(posts || []);
  const [lastDate, setLastDate] = useState(
    posts.length > 0 ? posts[posts.length - 1].date : null
  );
  const [loading, setLoading] = useState(false);

  async function getNextPage() {
    if (lastDate === null) {
      return [];
    }
    setLoading(true);
    const result = await client.fetch<SanityDocument[]>(PAGINATION_QUERY, {
      lastDate,
    });
    setList([...list, ...result]);
    if (result.length > 0) {
      setLastDate(result[result.length - 1].date);
    } else {
      setLastDate(null);
    }
    setLoading(false);
    return result;
  }
  return list && (
    <div>
      {list?.length > 0 ? (
        list.map((post) => (
          <Link
            key={post._id}
            href={`/posts/${post.slug.current}`}
            className="grid grid-cols-10 items-center gap-4 mb-8"
          >
            {post.image ? (
              <span className="block relative col-span-4 aspect-video overflow-hidden">
                <Thumbnail image={post.image} />
              </span>
            ) : null}
            <h2 className="col-span-6 flex justify-start items-center text-2xl">
              {post.title}
            </h2>
          </Link>
        ))
      ) : (
        <div className="p-4 text-destructive">No posts found</div>
      )}
      <Button
        disabled={loading}
        onClick={getNextPage}
        variant="default"
      >
        {loading
          ? "Loading..."
          : !lastDate
          ? "No More Posts"
          : "Load More Posts"}
      </Button>
    </div>
  );
}
