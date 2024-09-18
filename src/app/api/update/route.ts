"use server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { _type, _id, slug, operation }: { _type: string; _id: string; slug: string, operation: string } =
    await req.json();
  console.log({ _type, _id, slug, operation });
  switch (true) {
    case _type ==="home":
      revalidateTag("home");
      revalidateTag("sitemap");
      break;
    case _type === "page":
      revalidateTag(slug);
      revalidateTag("sitemap");
      break;
    case _type === "post":
      revalidateTag(slug);
      revalidateTag("posts");
      revalidateTag("home");
      revalidateTag("sitemap");
      break;
    default:
      break;
  }
  // revalidateTag('pages');
  return new Response(JSON.stringify({ message: "Thanks!" }));
}

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};
