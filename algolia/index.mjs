import { getPosts } from "./getPosts.mjs";
import { buildIndex } from "./buildIndex.mjs";

(async function () {
  const posts = await getPosts();
  console.log(posts.length);
  await buildIndex("posts", posts);
})();