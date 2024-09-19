import { algoliasearch } from "algoliasearch";
import { blocksToText } from "../lib/blocksToText.mjs";
import dotenv from "dotenv";
dotenv.config();

const transformPostsToSearchObjects = (posts) => {
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
    : null;
  return nPosts;
};

export const buildIndex = async (indexName, posts) => {
  try {
    const transformed = transformPostsToSearchObjects(posts);
    // // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    // // initialize the index with your index name
    // const index = client.initIndex(indexName);

    // // save the objects!
    const algoliaResponse = await client.replaceAllObjects({
      indexName: "posts",
      objects: transformed,
      batchSize: 1000,
    });
    console.log({ algoliaResponse });
    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added records to Algolia search (${indexName}).`
    );
  } catch (error) {
    console.log(indexName, error);
  }
};
