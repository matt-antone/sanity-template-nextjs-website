"use server";
import { client } from "@/sanity/lib/client";

export async function getPaginatedPosts(pageSize: number = 9, pageIndex: number = 0) {
  const start = pageIndex * pageSize;
  const end = start + pageSize;

  const query = `
    *[_type == "walkthrough"] | order(publishedAt desc) {
      ...,
      gallery[]{...,asset->},
      "categories": categories[]->{title}
    }[${start}...${end}]
  `;

  const posts = await client.fetch(query);
  
  // Get total count for pagination
  const totalQuery = `count(*[_type == "walkthrough"])`;
  const total = await client.fetch(totalQuery);

  return {
    posts,
    total,
    hasMore: end < total
  };
}