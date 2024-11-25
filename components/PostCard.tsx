"use client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import HexagonImage from "./custom/HexagonImage";
import * as React from "react";
import { motion } from "framer-motion";
interface IPostCardProps {
  post: SanityDocument;
  delay: number;
  slug?: string;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ post, delay, slug }) => {
  return (
    <motion.div
      key={post._id}
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Link href={`/${slug}/${post.slug.current}`}>
        {post.gallery?.length > 0 && post.gallery[0].asset && (
          <div className="relative mb-4">
            <HexagonImage image={post.gallery[0]} className="w-[80%] h-auto mx-auto" />
          </div>
        )}
        <span className="text-sm font-medium mb-2 text-center line-clamp-2">
          {post.title}
        </span>
        {/* <time className="text-sm text-center mb-2">
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.description && (
          <p className="text-gray-600 mb-4 text-center line-clamp-2">{post.description}</p>
        )} */}
      </Link>
    </motion.div>
  );
};

export default PostCard;
