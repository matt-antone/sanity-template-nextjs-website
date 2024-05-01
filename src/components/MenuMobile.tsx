"use client";
import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import { useState } from "react";
import { TbMenu } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

import Image from "next/image";

interface IMenuMobileProps {
  nav: SanityDocument;
  settings: SanityDocument;
}

const MenuMobile: React.FunctionComponent<IMenuMobileProps> = ({ nav, settings }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <nav
        className={`${
          open ? "block" : "hidden"
        } fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-80 z-30 flex justify-center items-start p-12`}
        onClick={() => setOpen(!open)}
      >
        <div className="bg-white p-8 rounded relative shadow-lg">
        <a href="/" className="text-xl font-bold block w-[200px] my-8">
              {settings?.siteLogo ? (
                <Image
                  src={settings?.siteLogo?.asset?.url}
                  width={settings.siteLogo.asset.metadata.dimensions.width}
                  height={settings.siteLogo.asset.metadata.dimensions.height}
                  alt={settings?.siteTitle || "Untitled"}
                />
              ) : (
                settings?.siteTitle || "Untitled"
              )}
            </a>
          <ul className="grid gap-6">
            {nav.items &&
              nav.items.map((item: any) => {
                return (
                  <li key={`${item._id}-mobile`} className="text-center">
                    <Link
                      href={item.link || `/${item?.page?.slug?.current}`}
                      className="text-2xl"
                    >
                      {item.text}{" "}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <button
            onClick={() => setOpen(!open)}
            className="absolute top-2 right-2"
          >
            <IoIosCloseCircle className="text-3xl" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </nav>
      <button onClick={() => setOpen(!open)}>
        <TbMenu className="text-3xl" />
      </button>
    </div>
  );
};

export default MenuMobile;
