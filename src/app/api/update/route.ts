"use server";
import type { PostDocument } from "@/src/types";
import { revalidateTag } from "next/cache";
import { loadQuery } from "@/sanity/lib/store";
import { POST_ALGOLIA_QUERY } from "@/lib/queries";

export async function POST(req: Request) {
  const {
    _type,
    _id,
    slug,
    operation,
  }: { _type: string; _id: string; slug: string; operation: string } =
    await req.json();
  console.log({ _type, _id, slug, operation });
  switch (true) {
    case _type === "home":
      console.log("clear home cache");
      revalidateTag("home");
      revalidateTag("sitemap");
      break;
    case _type === "page":
      console.log(`clear ${slug} cache`);
      revalidateTag(slug);
      revalidateTag("sitemap");
      break;
    case _type === "post":
      console.log(`clear ${slug} cache`);
      revalidateTag(slug);
      revalidateTag("posts");
      revalidateTag("home");
      revalidateTag("sitemap");
      const { data } = await loadQuery<PostDocument>(
        POST_ALGOLIA_QUERY,
        { slug: slug },
        {
          next: {
            revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
            tags: [slug],
          },
        }
      );
      updateAlgoliaPost("posts", data);
      break;
    default:
      break;
  }
  // revalidateTag('pages');
  return new Response(JSON.stringify({ message: "Thanks!" }));
}

import type { NextApiRequest, NextApiResponse } from "next";
import { updateAlgoliaPost } from "./updateAlgoliaPost";

type ResponseData = {
  message: string;
};