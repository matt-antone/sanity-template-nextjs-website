import * as React from 'react';

interface IProseProps {
  children: React.ReactNode;
}

const Prose: React.FunctionComponent<IProseProps> = (props) => {
  return <div className="prose prose-lg max-w-[75ch]">{props.children}</div>;
};

export default Prose;
