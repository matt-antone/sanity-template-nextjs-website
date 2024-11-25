import * as React from 'react';

interface IFlexColSmallProps {
  children: React.ReactNode;
}

const FlexColSmall: React.FunctionComponent<IFlexColSmallProps> = (props) => {
  return <div className="flex flex-col gap-4">{props.children}</div>;
};

export default FlexColSmall;
