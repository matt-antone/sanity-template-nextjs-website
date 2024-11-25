import * as React from "react";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import HexagonImage from "./HexagonImage";
import Hexagon from "./Hexagon";

interface IHexGridProps {
  images: SanityAsset[];
}

const HexImageGrid: React.FunctionComponent<IHexGridProps> = ({
  images = [],
}) => {
  const animationClasses = [
    "animate-fade-in-out-sm",
    "animate-fade-in-out-md",
    "animate-fade-in-out-lg",
  ];
  const transitionDelayClasses = [
    "delay-0",
    "delay-200",
    "delay-400",
    "delay-600",
    "delay-800",
    "delay-1000",
    "delay-1200",
    "delay-1400",
    "delay-1600",
    "delay-1800",
    "delay-2000",
  ];

  return (
    <div className="grid grid-cols-12 hexagon-image-grid w-[120%] mx-auto">
      {images.map((image, index) => (
        <React.Fragment key={image._id + index.toString()}>
          {/* Add random number of plain hexagons before each image */}
          {Array.from({ length: Math.floor(Math.random() * 5) }).map(
            (_, hexIndex) => (
              // <motion.div
              // key={image._id+Math.floor(Math.random() * 1000000).toString()}
              // initial={{ opacity: 0 }}
              //   exit={{ opacity: 0 }}
              //   animate={{ opacity: 1 }}
              //   transition={{ duration: 1, delay: Math.floor(Math.random() * 1) }}
              //   className="even:translate-y-1/2 translate-x-[-1.5rem]"
              // >
              <Hexagon
                key={image._id + Math.floor(Math.random() * 1000000).toString()}
                className={`opacity-0 even:translate-y-1/2 translate-x-[-1.5rem] block w-full h-auto fill-slate-400 ${animationClasses[Math.floor(Math.random() * animationClasses.length)]} ${transitionDelayClasses[Math.floor(Math.random() * transitionDelayClasses.length)]}`}
                color=""
              />
              // </motion.div>
            )
          )}
          {/* Add the image hexagon */}
          {/* <motion.div
            key={image._id+Math.floor(Math.random() * 1000000).toString()}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: Math.floor(Math.random() * 1) }}
            className="even:translate-y-1/2 translate-x-[-1.5rem]"
          > */}
          <HexagonImage
            key={image._id + Math.floor(Math.random() * 1000000).toString()}
            image={{ asset: image }}
            className={`opacity-0 even:translate-y-1/2 translate-x-[-1.5rem] block w-full h-auto ${animationClasses[Math.floor(Math.random() * animationClasses.length)]} ${transitionDelayClasses[Math.floor(Math.random() * transitionDelayClasses.length)]}`}
          />
          {/* </motion.div> */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HexImageGrid;
