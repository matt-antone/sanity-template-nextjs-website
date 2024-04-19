import type { Metadata } from 'next'
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/src/components/Posts";
import PostsPreview from "@/src/components/PostsPreview";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/src/lib/queries";
 
export const metadata: Metadata = {
  title: 'Posts',
  description: 'Our latest posts.',
}

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    }
  );

  return (
    <main>
      {draftMode().isEnabled ? (
        <PostsPreview initial={initial} />
      ) : (
        <Posts posts={initial.data} />
      )}
    </main>
  );
}
