import type { PageDocument, Metadata } from "@/src/types";
import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/store";
import { HOME_PAGE_QUERY } from "@/lib/queries";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getStructuredPage } from "@/lib/structuredData";
import LayoutPage from "@/components/LayoutPage";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our site.",
};

export default async function Page() {
  // Load home page
  const initial = await loadQuery<PageDocument>(
    HOME_PAGE_QUERY,
    { slug: "home" },
    {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
        tags: ["home","posts"],
      },
    }
  );

  const structuredData = await getStructuredPage(initial.data);

  if (initial.data === null) {
    notFound();
  }
  return (
    <Container>
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    id="page-jsonld"
  />
    <LayoutPage {...initial.data} />
  </Container>
  );
}
