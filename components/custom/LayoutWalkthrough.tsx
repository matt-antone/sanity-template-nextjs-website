import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from "@/components/blocks";
import Prose from "../Prose";
import SanityPortableText from "../SanityPortableText";
import PaintMixes from "./PaintMixes";
import Steps from "./Steps";
import PaintList from "./PaintList";
export default function LayoutWalkthrough(props: any) {
  const { body = null, date = "", gallery = [], walkthroughSteps = [] } = props;
  const paints = new Set();
  walkthroughSteps.forEach((step: any) => {
    return step.paintList.flatMap((paint: any) => {
      return paint.mix.map((p: any) => {
        paints.add(JSON.stringify({
          name: p.paint.title.trim(),
          color: p.paint.color?.hex || null,
        }));
      });
    });
  });
  console.log([...paints]);
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
      <PaintList paintList={Array.from(paints).map((p: any) => JSON.parse(p))} />
      {body ? (
        <Prose>
          <SanityPortableText blocks={body} />
          <Steps steps={walkthroughSteps} />
        </Prose>
      ) : null}
    </div>
  );
}
