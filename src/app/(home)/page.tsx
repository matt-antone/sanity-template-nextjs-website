import type { Metadata } from "next";
import Container from "@/src/components/Container";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our site.",
};

export default async function Page() {
  // Load home page

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: '{}'}}
          key="product-jsonld"
        />
      </Head>
      <Container>Home</Container>
    </>
  );
}
