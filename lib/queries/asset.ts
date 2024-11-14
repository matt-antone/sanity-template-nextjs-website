import { groq } from "next-sanity";

export const ASSET_QUERY = groq`*[ _type == "sanity.imageAsset" && _id == $id][0]`;