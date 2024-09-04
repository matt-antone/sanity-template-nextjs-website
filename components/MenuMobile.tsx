"use client";
import * as React from "react";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { BiMenu } from "react-icons/bi";

interface IMenuMobileProps {
  nav: SanityDocument;
  settings: SanityDocument;
}

const MenuMobile = ({ nav, settings }: IMenuMobileProps) => {
  return nav.items && (
    <div className="lg:hidden flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="w-full">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 m-0 p-0">
              <span className="sr-only">Open menu</span>
              <BiMenu className="text-3xl" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-screen flex flex-col p-4">
              {nav.items.map((child: any) => (
                <NavigationMenuLink
                  className="w-full border-t  py-3"
                  onClick={() => {}}
                  key={`${child._id}-mobile`}
                >
                  <Link
                    key={`${child._id}-mobile`}
                    href={child.link || `/${child?.page?.slug?.current}`}
                    className="text-base"
                  >
                    {child.text}{" "}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MenuMobile;

const hideNavItemsVariant = {
  opened: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 1.1,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const mobileMenuVariant = {
  opened: {
    y: "0%",
    transition: {
      delay: 0.15,
      duration: 1.1,
      ease: [0.74, 0, 0.19, 1.02],
    },
  },
  closed: {
    y: "-100%",
    transition: {
      delay: 0.35,
      duration: 0.63,
      ease: [0.74, 0, 0.19, 1.02],
    },
  },
};

const fadeInVariant = {
  opened: {
    opacity: 1,
    transition: {
      delay: 1.2,
    },
  },
  closed: { opacity: 0 },
};

const ulVariant = {
  opened: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.18,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const liVariant = {
  opened: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const fadeInStart = { opacity: 0 };
const fadeInEnd = { opacity: 1 };
const fadeInTransition = { duration: 1 };
