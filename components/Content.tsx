import * as React from 'react';

interface IContentProps {
  children: React.ReactNode
}

const Content: React.FunctionComponent<IContentProps> = (props) => {
  return (
    <div id="content" className='min-h-[calc(100vh-22rem)] w-full mb-16'>
      {props.children}
    </div>
  );
};

export default Content;
