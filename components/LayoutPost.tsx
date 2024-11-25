import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from "@/components/blocks";
import Prose from "./Prose";
import SanityPortableText from "./SanityPortableText";
import Steps from "./custom/Steps";
import PaintList from "./custom/PaintList";
export default function LayoutPost(props: any) {
  const { body = null, date = "", gallery = [], steps = [] } = props;

  // if this is a guide, we need to get the paints
  const paints = new Set();
  steps?.forEach((step: any) => {
    return step?.paintList?.flatMap((paint: any) => {
      return paint.mix.map((p: any) => {
        paints.add(
          JSON.stringify({
            name: p.paint.title.trim(),
            color: p.paint.color?.hex || null,
          })
        );
      });
    });
  });
  return body ? (
    <>
      <Prose>
        <time>{new Date(date).toLocaleDateString("en-US")}</time>
        <SanityPortableText blocks={body} />
      </Prose>
      {/* used for guides */}
      {paints && <PaintList paintList={Array.from(paints).map((p: any) => JSON.parse(p))} />}
      {steps && <Steps steps={steps} />}
    </>
  ) : null;
}
