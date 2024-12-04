import { SanityAsset } from "@sanity/image-url/lib/types/types";
import * as React from "react";
import { loadQuery } from "@/sanity/lib/store";
import { ASSET_QUERY } from "@/lib/queries/asset";
import Image from "next/image";

interface IGalleryProps {
  images: SanityAsset[];
}

export const GalleryBlock: React.FunctionComponent<IGalleryProps> = ({
  images = [],
}) => {
  return images.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 w-[400px] md:w-[600px] mx-auto mb-16">
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
          <Image
            key={image.asset._ref}
            src={`${asset?.url}?w=200&h=200&fit=crop&dpr=2&auto=format`}
            alt={asset.altText || ""}
            width={200}
            height={200}
            className="mx-auto"
          />
        );
      })}
    </div>
  ) : null;
};
