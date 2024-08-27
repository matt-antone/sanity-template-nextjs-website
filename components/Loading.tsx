import * as React from 'react';

interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return (
    <div className="bg-black text-white absolute top-0 left-0 w-full h-full flex justify-center items-center">
      Loading...
    </div>
  );
};

export default Loading;
