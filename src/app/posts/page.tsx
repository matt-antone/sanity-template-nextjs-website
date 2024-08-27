import type { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/components/Posts";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/lib/queries";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";

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
