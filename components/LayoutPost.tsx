import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from "@/components/blocks";

export default function LayoutPost(props: any) {
  const { title = "Untitled", image = null, body = null, date = '' } = props;

  return (
    <div className="">
      <div className="relative">
        {image?.asset ? (
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
          <time>{new Date(date).toLocaleDateString("en-US")}</time>
          <PortableText value={body} components={components} />
        </div>
      ) : null}
    </div>
  );
}
