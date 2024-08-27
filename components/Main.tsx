import * as React from "react";

interface IMainProps {
  children: React.ReactNode;
  className?: string;
}

const Main: React.FunctionComponent<IMainProps> = ({ children, className = '' }) => {
  return (
    <main className={`relative ${className}`}>
      {children}
    </main>
  );
};

export default Main;
