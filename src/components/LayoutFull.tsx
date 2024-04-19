import * as React from "react";

interface ILayoutFullProps {
  children: React.ReactNode;
}

const LayoutFull: React.FunctionComponent<ILayoutFullProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default LayoutFull;
