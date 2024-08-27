import { SanityAsset } from "@sanity/image-url/lib/types/types";
import * as React from "react";
import NextImage from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

interface IImageProps {
  image: SanityAsset;
}

export const Image: React.FunctionComponent<IImageProps> = (props) => {
  const builder = imageUrlBuilder(client);
  return (
    <NextImage
      src={builder
        .image(props.image)
        .width(400)
        .dpr(2)
        .auto("format")
        .url()}
      alt={props?.image?.alt || ""}
      width={400}
      height={300}
      className="mb-16 mx-auto"
    />
  );
};
