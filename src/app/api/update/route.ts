import type { PostDocument } from "@/src/types";
import { revalidateTag } from "next/cache";
import { loadQuery } from "@/sanity/lib/store";
import { POST_ALGOLIA_QUERY } from "@/lib/queries";
import { updateAlgoliaPost } from "./updateAlgoliaPost";
import { addAlgoliaPost } from "./addAlgoliaPost";
import { deleteAlgoliaPost } from "./deleteAlgoliaPost";

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
  const { _type, _id, slug, operation } = await req.json();

  const revalidateTags = getRevalidateTags(_type, slug);
  revalidateTags.forEach((tag) => revalidateTag(tag));

  if (_type === DocumentType.Post) {
    try {
      switch (operation) {
        case "update":
        case "create":
          const { data } = await loadQuery<PostDocument>(
            POST_ALGOLIA_QUERY,
            { slug },
            {
              next: {
                revalidate: process.env.NODE_ENV === "production" ? 2.628e9 : 0,
                tags: [slug],
              },
            }
          );
          // Update Algolia post logic here
          await updateAlgoliaPost("posts", data);
          break;
        case "delete":
          // Delete Algolia post logic here
          await deleteAlgoliaPost("posts", _id);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}