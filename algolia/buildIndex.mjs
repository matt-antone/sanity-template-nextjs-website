import { algoliasearch } from "algoliasearch";
import { transformPostsToSearchObjects } from "../lib/transformPostsToSearchObjects.mjs";
import dotenv from "dotenv";
dotenv.config();

const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const apiKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY || "";


export const buildIndex = async (indexName, posts) => {
  try {
    
    const transformed = transformPostsToSearchObjects(posts);
    //initialize the client with your environment variables
    const client = algoliasearch(appID, apiKey);

    //replace the objects
    const algoliaResponse = await client.replaceAllObjects({
      indexName,
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
