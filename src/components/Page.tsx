import type { PageDocument } from "@/src/types";
import type { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import LayoutHeading from "./LayoutHeading";
import LayouSidebar from "./LayoutSidebar";
import Image from "next/image";

import * as React from "react";

const Page: React.FunctionComponent<PageDocument> = (props) => {
  const { title = "Untitled", image = null, body = null } = props;
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
        <div className="prose">
          <PortableText value={body} />
        </div>
      ) : null}
    </div>
  );
};

export default Page;
