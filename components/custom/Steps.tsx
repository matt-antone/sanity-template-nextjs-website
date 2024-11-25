import * as React from "react";
import PaintMixes from "./PaintMixes";
import SanityPortableText from "@/components/SanityPortableText";
import Prose from "../Prose";
import FlexColSmall from "../FlexColSmall";

interface IStepsProps {
  steps: any[];
}

const Steps: React.FunctionComponent<IStepsProps> = ({ steps }) => {
  return steps?.length > 0 && (
    <div>
      <h2 className="text-2xl font-bold mb-8">Instructions</h2>
      {steps?.map((step: any, index: number) => {
        return (
          <div key={step._key} className={`${index > 0 ? "pt-8" : "pb-8"}`}>
            <FlexColSmall>
              <div className="bg-slate-100 p-8 rounded max-w-[75ch]">
                <h3 className="text-xl font-bold">
                  {index + 1}. {step.step}
                </h3>
                <div className="not-prose py-8 mx-auto">
                  <PaintMixes paintList={step.paintList} />
                </div>
                <div className="">
                  <Prose>
                    <SanityPortableText blocks={step.description} />
                  </Prose>
                </div>
              </div>
            </FlexColSmall>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
