"use client";
import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import { useState } from "react";

interface IMenuMobileProps {
  nav: SanityDocument;
}

const MenuMobile: React.FunctionComponent<IMenuMobileProps> = ({nav}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <nav className={""}>
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
      <button>Menu</button>
    </div>
  );
};

export default MenuMobile;
