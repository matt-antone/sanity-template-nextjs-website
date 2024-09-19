import { algoliasearch } from "algoliasearch";

const appID = "ALGOLIA_APPLICATION_ID";
// API key with `addObject` and `editSettings` ACL
const apiKey = "ALGOLIA_API_KEY";


export const updateAlgoliaPost = async (index:string, post: any) => {
  console.log("updating post", {index, post})
  const client = algoliasearch(appID, apiKey);
  // Add record to an index
  await client.replaceAllObjects({
    indexName: index,
    objects: [post],
  });
}