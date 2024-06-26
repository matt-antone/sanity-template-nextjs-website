import type { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/src/components/Posts";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/src/lib/queries";
import LayoutSidebar from "@/src/components/LayoutSidebar";
import LayoutHeading from "@/src/components/LayoutHeading";
import Container from "@/src/components/Container";

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
    <Container>
      <LayoutHeading text="Posts"/>
      <Posts posts={initial.data} />    
    </Container>
  );
}
