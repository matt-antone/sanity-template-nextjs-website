"use server";

import { loadQuery } from "@/sanity/lib/store";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

interface IGetSanityImagesProps { 
  start: number;
  end: number;
}

export const getSanityImages = async ({start, end}:IGetSanityImagesProps) => {
  const { data } = await loadQuery<SanityAsset[]>(
    `*[_type == "sanity.imageAsset"] | order(random()) [$start...$end]`,
    {
      start: start,
      end: end
    },
    { next: { revalidate: 0 } }
  );
  return data;
};
