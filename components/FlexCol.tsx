import * as React from 'react';

interface IFlexColProps {
  children: React.ReactNode;
}

const FlexCol: React.FunctionComponent<IFlexColProps> = (props) => {
  // return props.children;
  return <div className="flex flex-col gap-12">{props.children}</div>;
};

export default FlexCol;
