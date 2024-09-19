import { algoliasearch } from "algoliasearch";
import { transformPostsToSearchObjects } from "@/lib/transformPostsToSearchObjects.mjs";

const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
// API key with `addObject` and `editSettings` ACL
const apiKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string;

export const deleteAlgoliaPost = async (index: string, postId: any) => {
  console.log("creating client", { index, postId });
  const client = algoliasearch(appID, apiKey);
  try {
    console.log("delete post", { index, postId });
    const algoliaResponse = await client.deleteObjects({
      indexName: index,
      objectIDs: [postId],
    });
    console.log({algoliaResponse});
    console.log(`🎉 Sucessfully added records to Algolia search (${index}).`);
    return algoliaResponse;
  } catch (error) {
    console.log(error,{appID, apiKey});
  }
};
