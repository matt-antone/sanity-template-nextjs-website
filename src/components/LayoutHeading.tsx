import * as React from 'react';
import Breadcrumbs from './Breadcrumbs';
interface ILayoutHeadingProps {
  text: string;
}

const LayoutHeading: React.FunctionComponent<ILayoutHeadingProps> = ({text}) => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold">{text}</h1>
      <Breadcrumbs/>
    </div>
  );
};

export default LayoutHeading;
