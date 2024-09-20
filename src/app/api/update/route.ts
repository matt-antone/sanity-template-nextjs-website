import type { PostDocument } from "@/src/types";
import { revalidateTag } from "next/cache";
import { loadQuery } from "@/sanity/lib/store";
import { POST_ALGOLIA_QUERY } from "@/lib/queries";
import { updateAlgoliaPost } from "./updateAlgoliaPost";
import { addAlgoliaPost } from "./addAlgoliaPost";
import { deleteAlgoliaPost } from "./deleteAlgoliaPost";
import { set } from "sanity";

enum DocumentType {
  Home = "home",
  Page = "page",
  Post = "post",
}

const getRevalidateTags = (docType: string, slug: string) => {
  switch (docType) {
    case DocumentType.Home:
      return ["home", "sitemap"];
    case DocumentType.Page:
      return [slug, "sitemap"];
    case DocumentType.Post:
      return [slug, "posts", "home", "sitemap"];
    default:
      return [];
  }
};

export async function POST(req: Request) {
  const post = await req.json();

  const revalidateTags = getRevalidateTags(post._type, post.slug);
  revalidateTags.forEach((tag) => revalidateTag(tag));

  if (post._type === DocumentType.Post) {
    try {
      switch (post.operation) {
        case "update":
        case "create":
          await updateAlgoliaPost("posts", post);
          break;
        case "delete":
          await deleteAlgoliaPost("posts", post._id);
          break;
      }
      return Response.json({ success: true });
    } catch (error) {
      console.error(error);
    }
  }
}