import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
interface IMenuMainProps {
  nav: SanityDocument;
}

const MenuMain: React.FunctionComponent<IMenuMainProps> = ({nav}) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-4">
        {nav.items &&
          nav.items.map((item: any) => {
            return (
              <li key={`${item._id}-mobile`}>
                <Link href={item.link || `/${item?.page?.slug?.current}`}>
                  {item.text}{" "}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default MenuMain;
