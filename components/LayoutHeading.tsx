import * as React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { cn } from "@/lib/utils";
interface ILayoutHeadingProps {
  text: string;
  subheading?: string;
  breadcrumbs?: boolean;
  reverse?: boolean;
}

const LayoutHeading: React.FunctionComponent<ILayoutHeadingProps> = ({
  text,
  subheading,
  breadcrumbs = true,
  reverse = false,
}) => {
  return (
    <div className={cn("flex flex-col gap-0 mb-8", reverse ? "text-white" : "")}>
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[6rem] leading-none font-black tracking-tighter">{text}</h1>
        {subheading && <p className="text-xl text-gray-600">{subheading}</p>}
      </div>
      {breadcrumbs && <Breadcrumbs title={text} />}
    </div>
  );
};

export default LayoutHeading;
