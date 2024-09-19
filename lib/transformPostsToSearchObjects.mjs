import { blocksToText } from "../lib/blocksToText.mjs";

export const transformPostsToSearchObjects = (posts = []) => {
  const nPosts = posts
    ? posts.map((post) => {
        let body = post.body ? blocksToText(post.body) : "";
        let enc = new TextEncoder();
        let dec = new TextDecoder("utf-8");
        let uint8 = enc.encode(body);
        let section = uint8.slice(0, 9500);
        body = dec.decode(section);
        const n = {
          ...post,
          objectID: post._id,
          body,
          link: `/posts/${post.slug.current}`,
          profiles: post?.profiles?.map((p) => p.title) || [],
          categories: post?.categories?.map((c) => c.title) || [],
          tags: post?.tags?.map((t) => t.title) || [],
        };
        return n;
      })
    : [];
  return nPosts;
};