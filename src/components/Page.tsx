import type { PageDocument } from "@/src/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

import * as React from "react";

const Page: React.FunctionComponent<PageDocument> = (props) => {
  const { image = null, body = null } = props;
  return (
    <div className="">
      <div className="relative">
        {image ? (
          <Image
            src={image.asset.url}
            alt={image.alt}
            width={640}
            height={480}
          />
        ) : null}
      </div>
      {body ? (
        <div className="prose max-w-none">
          <PortableText value={body} />
        </div>
      ) : null}
    </div>
  );
};

export default Page;
