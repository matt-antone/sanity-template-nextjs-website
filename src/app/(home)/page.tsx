import type { Metadata } from 'next'
import { SanityDocument } from "next-sanity";
import Container from "@/src/components/Container";
// import { draftMode } from "next/headers";
// import { loadQuery } from "@/sanity/lib/store";
// import { POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our site.',
}

export default async function Page() {

  return (
    <main>
      <Container>
        Home page
      </Container>
    </main>
  );
}
