import * as React from 'react';

interface IContentProps {
  children: React.ReactNode
}

const Content: React.FunctionComponent<IContentProps> = (props) => {
  return (
    <div id="content" className='min-h-[calc(100vh-16rem)] w-full'>
      {props.children}
    </div>
  );
};

export default Content;
