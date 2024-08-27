import type { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import LayoutPosts from "@/components/LayoutPosts";
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
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
      },
    }
  );

  return (
    <Container>
      <LayoutHeading text="Posts"/>
      <LayoutPosts posts={initial.data} />    
    </Container>
  );
}
