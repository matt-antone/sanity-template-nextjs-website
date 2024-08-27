import * as React from "react";

import { PageDocument } from "@/src/types";

import Link from "next/link";

interface IRecentPostsProps {
  posts: PageDocument[];
}

const RecentPosts: React.FunctionComponent<IRecentPostsProps> = async ({
  posts = [],
}) => {
  return (
    <div className="flex flex-col gap-8">
      {posts &&
        posts.map((post: any) => (
          <div key={post._id}>
            <Link
              href={`/media/${post.slug.current}`}
              className="text-darkblue line-clamp-3 font-bold"
            >
              {post.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RecentPosts;
