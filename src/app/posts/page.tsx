import type { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/src/components/Posts";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/src/lib/queries";
import LayoutSidebar from "@/src/components/LayoutSidebar";

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
    <LayoutSidebar heading="Posts" widgets={[()=><p>Sidebar</p>]}>
      <Posts posts={initial.data} />
    </LayoutSidebar>
  );
}
