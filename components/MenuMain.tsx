import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import Fonts from "./Fonts";
import slugify from "slugify";

interface IMenuMainProps {
  nav: SanityDocument;
}

const MenuMain: React.FunctionComponent<IMenuMainProps> = async ({ nav }) => {
  return (
    nav && (
      <nav className="hidden lg:block">
        <ul className="flex space-x-3">
          {/* Top Level */}
          {nav?.items &&
            nav.items.map((item: any) => {
              return (
                <li
                  key={`${slugify(item.text)}-main`}
                  className="text-lg flex items-center gap-1"
                >
                  {!item.children && (
                    <Link
                      href={
                        item?.navigationItemUrl ||
                        `#`
                      }
                      className="text-navigation text-sm font-medium"
                      tabIndex={0}
                    >
                      {item.text}
                    </Link>
                  )}
                  {item.children && (
                    // Sub Level
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <span className="text-navigation text-sm font-medium">
                          {item.text}
                        </span>
                        <FaAngleDown className="text-navigation w-3 h-3" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-4 mt-4 rounded-none">
                        {item.children.map((child: any) => {
                          return (
                            <div key={`${slugify(child.text)}-main`} className="flex items-center gap-1 justify-between">
                              {!child.children && (
                                <DropdownMenuItem
                                  key={`${child._id}-main`}
                                  className=""
                                >
                                  <Link
                                    href={
                                      child?.navigationItemUrl?.navigationItemUrl ||
                                      `/${child?.page?.slug?.current}`
                                    }
                                    className="text-navigation whitespace-nowrap font-medium"
                                  >
                                    {child.text}
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {child.children && (
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger  className="text-navigation whitespace-nowrap w-full flex items-center gap-1 justify-between">
                                    <div className="">
                                      <span className="text-navigation whitespace-nowrap font-medium">
                                        {child.text}
                                      </span>
                                    </div>
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent
                                    className="p-4 rounded-none"
                                    // side="right"
                                    sideOffset={32}
                                    // align="start"
                                  >
                                    {child.children.map((item: any) => {
                                      return (
                                        <DropdownMenuItem
                                          asChild
                                          key={`${slugify(item.text)}-main`}
                                        >
                                          <Link
                                            href={
                                              item?.link ||
                                              item?.navigationItemUrl
                                                ?.navigationItemUrl ||
                                              `/${item?.page?.slug?.current}`
                                            }
                                            className="text-navigation whitespace-nowrap font-medium"
                                          >
                                            <Fonts>
                                              <span className="block">
                                                {item.text}
                                              </span>
                                            </Fonts>
                                          </Link>
                                        </DropdownMenuItem>
                                      );
                                    })}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              )}
                            </div>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}  
                </li>
              );
            })}
            {/* Search or other stuff */}
            {/* <li>
              <button>stuff</button>
            </li> */}
        </ul>
      </nav>
    )
  );
};

export default MenuMain;
