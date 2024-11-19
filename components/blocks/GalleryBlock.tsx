import { SanityAsset } from "@sanity/image-url/lib/types/types";
import * as React from "react";
import { loadQuery } from "@/sanity/lib/store";
import { ASSET_QUERY } from "@/lib/queries/asset";

interface IGalleryProps {
  images: SanityAsset[];
}

export const GalleryBlock: React.FunctionComponent<IGalleryProps> = ({
  images = [],
}) => {
  return images.length > 0 ? (
    <div className="flex flex-wrap justify-start gap-1 mx-auto mb-16">
      {images.map(async (image) => {
        const { data: asset }: { data: SanityAsset } = await loadQuery(
          ASSET_QUERY,
          { id: image.asset._ref },
          {
            next: {
              revalidate: 31536000,
            },
          }
        );
        return (
          <div className="flex-1">
            <img
              key={image.asset._ref}
              src={`${asset?.url}?w=400&h=400&fit=crop&dpr=2&auto=format`}
              alt={asset.altText || ""}
              width={400}
              height={400}
              className="w-full max-w-[400px] mx-auto"
            />
          </div>
        );
      })}
    </div>
  ) : null;
};
