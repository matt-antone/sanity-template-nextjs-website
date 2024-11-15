import * as React from 'react';

interface IProseProps {
  children: React.ReactNode;
}

const Prose: React.FunctionComponent<IProseProps> = (props) => {
  return <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto">{props.children}</div>;
};

export default Prose;
