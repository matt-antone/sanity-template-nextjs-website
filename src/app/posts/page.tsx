import type { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/src/components/Posts";
import PostsPreview from "@/src/components/PostsPreview";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/src/lib/queries";
import LayoutFull from "@/src/components/LayoutFull";
import LayoutHeading from "@/src/components/LayoutHeading";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our latest posts.",
};

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    }
  );

  return (
    <LayoutFull>
      <LayoutHeading text="Posts" />
      <Posts posts={initial.data} />
    </LayoutFull>
  );
}
