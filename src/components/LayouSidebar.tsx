import * as React from 'react';

interface ILayoutSidebarProps {
  children: React.ReactNode;
  widgets?: React.FunctionComponent[] | null;
}

const LayoutSidebar: React.FunctionComponent<ILayoutSidebarProps> = (props) => {
  return (
    <div className="grid lg:grid-cols-2">
      <main>{props.children}</main>
      <aside>
        {props.widgets?.map((Widget, index) => (
          <Widget key={index} />
        ))}
      </aside>
    </div>
  );
};

export default LayoutSidebar;
