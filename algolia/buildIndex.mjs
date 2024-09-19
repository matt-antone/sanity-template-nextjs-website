import { algoliasearch } from "algoliasearch";
import { transformPostsToSearchObjects } from "../lib/transformPostsToSearchObjects.mjs";
import dotenv from "dotenv";
dotenv.config();

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
