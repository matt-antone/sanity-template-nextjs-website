/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { singletonTools } from "sanity-plugin-singleton-tools";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { schemaTypes } from "@/lib/schema";
import { structure } from "@/lib/schema/structure";
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import {media, mediaAssetSource} from 'sanity-plugin-media'


// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: schemaTypes,
  plugins: [
    // Add the "singletonTools" plugin
    singletonTools(),
    structureTool({
      structure,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Add the "unsplashImageAsset" plugin
    unsplashImageAsset(),
    vercelDeployTool(),
    media()
  ],
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource)
      }
    }
  }
});
