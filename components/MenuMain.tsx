import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import Fonts from "./Fonts";

interface IMenuMainProps {
  nav: SanityDocument;
}

const MenuMain: React.FunctionComponent<IMenuMainProps> = async ({ nav }) => {
  return (
    nav && (
      <nav className="hidden lg:block">
        <ul className="flex space-x-5">
          {nav?.items &&
            nav.items.map((item: any) => {
              return (
                <li
                  key={`${item.link || item?.navigationItemurl?.relativePath || `/${item?.page?.slug?.current}`}-main`}
                  className="text-lg flex items-center gap-1"
                >
                  <Link
                    href={
                      item.link ||
                      item?.navigationItemurl?.relativePath ||
                      `/${item?.page?.slug?.current}`
                    }
                  >
                    {item.text}{" "}
                  </Link>
                  {item.children && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <span className="sr-only">Open menu</span>
                        <FaAngleDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="px-12 py-8 mt-4 rounded-none">
                        {item.children.map((child: any) => {
                          return (
                            <DropdownMenuItem asChild key={`${child._id}-main`}>
                              <Link
                                href={
                                  child?.link ||
                                  child?.navigationItemUrl?.relativePath ||
                                  `/${child?.page?.slug?.current}`
                                }
                              >
                                <Fonts>
                                  <span className="block text-lg py-2">
                                    {child.text}
                                  </span>
                                </Fonts>
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </li>
              );
            })}
        </ul>
      </nav>
    )
  );
};

export default MenuMain;
