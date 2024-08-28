import * as React from 'react';

interface IGridSidebarProps {
  children: React.ReactNode;
}

const Grid: React.FunctionComponent<IGridSidebarProps> = (props) => {
  return (
    <div className="grid grid-cols-10 gap-12">
      {props.children}
    </div>
  );
};

export default Grid;
