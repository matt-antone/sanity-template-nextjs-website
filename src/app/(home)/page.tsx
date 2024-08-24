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
      {initial.data.gallery && (
        <>
          <h1 className="text-[10rem] font-black relative z-50 mt-10 text-center leading-none uppercase drop-shadow-lg dro">
            Dark
            <br />
            Angels
          </h1>

          <div className="relative flex flex-col items-center mb-[30vw]">
            <div
              className={
                "gallery3d w-full text-center flex justify-center items-start absolute -top-12 z-50 h-[36vw]"
              }
            >
              <div className="slider transform mx-autoj mt-[11vw]">
                {initial.data.gallery.reverse().map((image: any, i: number) => {
                  const count = initial.data.gallery.length;
                  const rotateY = i * (360 / count);
                  const styles = {
                    "--rotateY": `${rotateY}deg`,
                  } as React.CSSProperties;
                  return (
                    image.asset && (
                      <div className="item" key={image._key} style={styles}>
                        <Image
                          src={`${image.asset.url}?w=500&h=500&fit=crop&dpr=2`}
                          alt={image.alt}
                          width={200}
                          height={200}
                          className="hover:scale-125 transition"
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            {/* <Image
              src="https://cdn.sanity.io/images/6eag1k58/production/ca4eafb52a6b350ee58ce7c206cc9c97deae0be3-3024x3024.jpg"
              alt="logo"
              width={1200}
              height={1200}
              className="w-full object-cover opacity-30 absolute inset-0"
            /> */}
          </div>
          <div className="prose max-w-none">
            <Container>
              <PortableText value={initial.data.body} />
            </Container>
          </div>
        </>
      )}
    </>
  );
}
