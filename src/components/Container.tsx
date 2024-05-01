import * as React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = ({children}) => {
  return (
    <div className="container mx-auto px-8 max-w-5xl">
      {children}
    </div>
  );
};

export default Container;
