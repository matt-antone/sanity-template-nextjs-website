import { algoliasearch } from "algoliasearch";

const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
// API key with `addObject` and `editSettings` ACL
const apiKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string;


export const updateAlgoliaPost = async (index:string, post: any) => {
  try {
    console.log("updating post", {index, post})
    const client = algoliasearch(appID, apiKey);
    // Add record to an index
    const algoliaResponse = await client.replaceAllObjects({
      indexName: index,
      objects: [post],
    });
    console.log({ algoliaResponse });
    console.log(`🎉 Sucessfully added records to Algolia search (${index}).`);
    return algoliaResponse
  } catch (error) {
    console.log(error);     
  }
}