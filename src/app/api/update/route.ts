import { revalidateTag } from "next/cache";

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

  return Response.json({ success: true });
}