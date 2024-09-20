import { algoliasearch } from "algoliasearch";
import { transformPostsToSearchObjects } from "@/lib/transformPostsToSearchObjects.mjs";
import dotenv from "dotenv";
dotenv.config();

const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const apiKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string;

export const updateAlgoliaPost = async (index: string, post: any) => {
  try {
    const transformed = transformPostsToSearchObjects([post]);
    //initialize the client with your environment variables
    const client = algoliasearch(appID, apiKey);

    //replace the objects
    const algoliaResponse = await client.saveObjects({
      indexName: index,
      objects: transformed,
    });
    console.log({ algoliaResponse });
    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added records to Algolia search (${index}).`
    );
    return algoliaResponse;
  } catch (error) {
    console.log(error, { appID, apiKey });
  }
};
