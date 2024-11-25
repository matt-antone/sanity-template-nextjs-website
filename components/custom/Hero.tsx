import { SanityAsset } from "@sanity/image-url/lib/types/types";
import * as React from "react";
import HexagonImage from "./HexagonImage";

interface IHeroProps {
  image?: SanityAsset;
  children?: React.ReactNode;
  images?: SanityAsset[];
  className?: string;
}

const Hero: React.FunctionComponent<IHeroProps> = async ({
  image,
  images,
  children,
  className,
}) => {
  return (
    <>
      {image && (
        <HexagonImage
          image={image}
          className={`w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[45rem] xl:w-[60rem] 2xl:w-[70rem] 3xl:w-[80rem]
            -mr-[25%] md:-mr-[25%] lg:-mr-[30%] xl:-mr-[30rem] 2xl:-mr-[35rem] 3xl:-mr-[40rem] block transform-gpu transform-all duration-200 h-auto wrap-circle float-right ml-10`}
          size="large"
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </>
  );
};

export default Hero;
