import Image from "next/image";
import Prose from "../Prose";
import SanityPortableText from "../SanityPortableText";
import Steps from "./Steps";
import PaintList from "./PaintList";
import FlexCol from "@/components/FlexCol";
import Hexagon from "./Hexagon";

export default function LayoutGuide(props: any) {
  const { body = null, date = "", gallery = [], steps = [] } = props;
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
  return (
    <FlexCol>
      {body ? (
        <Prose>
          <SanityPortableText blocks={body} />
          <PaintList
            paintList={Array.from(paints).map((p: any) => JSON.parse(p))}
          />
          <Steps steps={steps} />
        </Prose>
      ) : null}
    </FlexCol>
  );
}
