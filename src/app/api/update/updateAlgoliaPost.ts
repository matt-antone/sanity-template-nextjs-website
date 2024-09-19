import { algoliasearch } from "algoliasearch";
import { transformPostsToSearchObjects } from "@/lib/transformPostsToSearchObjects.mjs";

const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
// API key with `addObject` and `editSettings` ACL
const apiKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string;

export const updateAlgoliaPost = async (index: string, post: any) => {
  console.log("creating client", { index, post });
  const client = algoliasearch(appID, apiKey);
  try {
    console.log("updating post", { index, post });
    const transformed = transformPostsToSearchObjects([post]);
    // Add record to an index
    const algoliaResponse = await client.replaceAllObjects({
      indexName: index,
      objects: transformed,
      batchSize: 1000,
    });
    console.log({algoliaResponse});
    console.log(`🎉 Sucessfully added records to Algolia search (${index}).`);
    return algoliaResponse;
  } catch (error) {
    console.log(error,{appID, apiKey});
  }
};
