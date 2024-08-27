import * as React from "react";
import Link from "next/link";
interface ISkipMenuProps {}

const SkipMenu: React.FunctionComponent<ISkipMenuProps> = (props) => {
  return (
    <nav className="absolute w-full -top-64 left-0 bg-white shadow-lg text-center p-8 focus-within:top-0">
      <Link href="#content">Skip to Content</Link>
    </nav>
  );
};

export default SkipMenu;
