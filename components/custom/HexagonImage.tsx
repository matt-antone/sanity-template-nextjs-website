import { cn } from "@/lib/utils";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import * as React from "react";

interface IHexagonImageProps {
  image: SanityAsset;
  className?: string;
  size?: "small" | "large";
}

const HexagonImage: React.FunctionComponent<IHexagonImageProps> = ({image, className, size}) => {
  const imageSize = size === "large" ? "w=1024&h=1024&q=75&fit=crop&auto=format&dpr=2" : "w=200&h=200&q=75&fit=crop&auto=format&dpr=2";
  return (
    <svg viewBox="0 0 512 512" className={cn("block", className)}>
      <mask id="svgmask1">
        <path
          id="maskPath"
          fill={"#fff"}
          d="M17.1 220c-12.9 22.3-12.9 49.7 0 72l88.3 152.9c12.9 22.3 36.6 36 62.4 36l176.6 0c25.7 0 49.5-13.7 62.4-36L494.9 292c12.9-22.3 12.9-49.7 0-72L406.6 67.1c-12.9-22.3-36.6-36-62.4-36l-176.6 0c-25.7 0-49.5 13.7-62.4 36L17.1 220z"
        />
      </mask>
      <defs>
        <clipPath id="svgclipPath1">
          <path id="maskPath" d="M17.1 220c-12.9 22.3-12.9 49.7 0 72l88.3 152.9c12.9 22.3 36.6 36 62.4 36l176.6 0c25.7 0 49.5-13.7 62.4-36L494.9 292c12.9-22.3 12.9-49.7 0-72L406.6 67.1c-12.9-22.3-36.6-36-62.4-36l-176.6 0c-25.7 0-49.5 13.7-62.4 36L17.1 220z" />
        </clipPath>
      </defs>
      <image
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref={`${image.asset.url}?${imageSize}`}
        mask="url(#svgmask1)"
        className="w-full h-auto"
      ></image>
    </svg>
  );
};

export default HexagonImage;
