/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost:
    process.env.NODE_ENV === "production"
      ? process.env.SANITY_STUDIO_PROD_SUBDOMAIN
      : process.env.SANITY_STUDIO_DEV_SUBDOMAIN,
});
