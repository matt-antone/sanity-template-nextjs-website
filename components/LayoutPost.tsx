import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from '@/components/blocks';

export default function LayoutPost(props: any) {
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
          <PortableText value={body} components={components}/>
        </div>
      ) : null}
    </div>
  );
}
