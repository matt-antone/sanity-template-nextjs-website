import * as React from 'react';

interface IBodyProps {
  children: React.ReactNode
}

const Body: React.FunctionComponent<IBodyProps> = (props) => {
  return <body className='overflow-x-hidden max-w-[100vw]'>{props.children}</body>;
};

export default Body;
