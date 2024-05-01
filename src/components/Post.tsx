import { PortableText } from "@portabletext/react";
import LayoutHeading from "./LayoutHeading";
import LayouSidebar from "./LayoutSidebar";
import Image from "next/image";

export default function Post(props: any) {
  const { title = "Untitled", image = null, body = null } = props;

  return (
    <div className="">
      <div className="relative">
        {image ? (
          <Image
            src={`${image.asset.url}?w=640`}
            alt={image.alt}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            className="mb-8"
          />
        ) : null}
      </div>
      {body ? (
        <div className="prose">
          <PortableText value={body} />
        </div>
      ) : null}
    </div>
  );
}
