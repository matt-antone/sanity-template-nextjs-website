import * as React from "react";
import Breadcrumbs from "./Breadcrumbs";
interface ILayoutHeadingProps {
  text: string;
  subheading?: string;
}

const LayoutHeading: React.FunctionComponent<ILayoutHeadingProps> = ({
  text,
  subheading,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row lg:items-baseline gap-0 lg:gap-4">
        <h1 className="text-[1.5rem] md:text-[2.5rem] leading-tight">{text}</h1>
        {subheading && <p className="text-xl text-gray-600">{subheading}</p>}
      </div>
      <Breadcrumbs title={text} />
    </div>
  );
};

export default LayoutHeading;
