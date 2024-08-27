import type { PageDocument, Metadata } from "@/src/types";
import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/store";
import { HOME_PAGE_QUERY } from "@/lib/queries";
import Container from "@/src/components/Container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

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
        revalidate: 2.628e9,
      },
      // Because of Next.js, RSC and Dynamic Routes this currently
      // cannot be set on the loadQuery function at the "top level"
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    }
  );

  if (initial.data === null) {
    notFound();
  }
  console.log(initial.data);
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="page-jsonld"
      /> */}
    </>
  );
}
