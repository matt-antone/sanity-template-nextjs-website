import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface IArticleSmallProps {
  post:any
}

const ArticleSmall: React.FunctionComponent<IArticleSmallProps> = ({post}) => {
  return (
    <article key={post.slug.current} className="mb-6 grid grid-cols-10 gap-4 w-full">
    <Link
      href={`/the-team/${post.slug.current}`}
      key={post.slug.current}
      className="col-span-2 text-darkblue"
    >
      <Image
        src={`${post.image.asset.url}?w=150&h=150&q=100&dpr=2`}
        alt={post.image.alt || post.title || ""}
        width={post.image.asset.metadata.dimensions.width}
        height={
          post.image.asset.metadata.dimensions.height
        }
        className="rounded-full"
      />
    </Link>
    <header className="flex flex-col justify-center col-span-7">
      <Link
        href={`/the-team/${post.slug.current}`}
        key={post.slug.current}
        className="text-lg font-bold"
      >
        {post.title}
      </Link>
    </header>
  </article>
  );
};

export default ArticleSmall;