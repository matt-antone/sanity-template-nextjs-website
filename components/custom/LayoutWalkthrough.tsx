import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from "@/components/blocks";
import Prose from "../Prose";
import SanityPortableText from "../SanityPortableText";
import PaintList from "./PaintList";
import Steps from "./Steps";
export default function LayoutWalkthrough(props: any) {
  const { body = null, date = "", gallery = [], walkthroughSteps = [] } = props;
  return (
    <div className="">
      <div className="relative">
        {gallery.length > 0 && gallery[0]?.asset?.url && (
          <Image
            src={`${gallery[0].asset.url}?w=1024&h=768&fit=crop&q=80`}
            alt={gallery[0].alt}
            width={gallery[0].asset.metadata?.dimensions?.width}
            height={gallery[0].asset.metadata?.dimensions?.height}
            className="mb-8"
          />
        )}
      </div>
      {body ? (
        <Prose>
          <time>{new Date(date).toLocaleDateString("en-US")}</time>
          <SanityPortableText blocks={body} />
          <Steps steps={walkthroughSteps} />
        </Prose>
      ) : null}
    </div>
  );
}
