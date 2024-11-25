import * as React from 'react';

import { SanityDocument } from "next-sanity";
import PostCard from './PostCard';
import { cn } from '@/lib/utils';

interface IPostListProps {
  posts: SanityDocument[];
  slug?: string;
  className?: string;
  title?: string;
}

const PostList: React.FunctionComponent<IPostListProps> = ({ posts, slug, className, title }) => {
  return (
    <div>
      {title && <h2 className="text-[5rem] font-bold mb-4">{title}</h2>}
      <div className={cn("grid grid-cols-1 md:grid-cols-6 gap-4", className)}>
        {posts.map((post, index) => (
          <div key={post._id} className="">
            <PostCard key={post._id} post={post} delay={index * .1} slug={slug} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
