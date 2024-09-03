import * as React from "react";
import {
  SITE_SETTINGS_QUERY,
  HEADER_NAVIGATION_QUERY,
  MOBILE_NAVIGATION_QUERY,
} from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Container from "./Container";
import Image from "next/image";
import MenuMain from "@/components/MenuMain";
import MenuMobile from "@/components/MenuMobile";

import Link from "next/link";

interface IHeaderProps {}

const Header = async (props: IHeaderProps) => {
  // Fetch the site settings and navigation items
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  const mobileNav = await client.fetch<SanityDocument>(MOBILE_NAVIGATION_QUERY);
  const mainNav = await client.fetch<SanityDocument>(HEADER_NAVIGATION_QUERY);

  return (
    <header className="relative z-50">
      <Container>
        <div className="flex justify-start items-center py-4 md:py-8 gap-12">
          <div>
            {settings?.siteLogo ? (
              <Link href="/" className="block w-[175px] lg:w-[300px]">
                <Image
                  src={settings?.siteLogo?.asset?.url}
                  width={settings.siteLogo.asset.metadata.dimensions.width}
                  height={settings.siteLogo.asset.metadata.dimensions.height}
                  alt={settings?.siteTitle || "Untitled"}
                />
              </Link>
            ) : settings?.siteTitle ? (
              <a href="/" className="text-xl font-bold">
                {settings.siteTitle}
              </a>
            ) : (
              <a href="/studio/structure/settings" className="text-blue-800">
                Add website name
              </a>
            )}
          </div>
           {mainNav && <MenuMain nav={mainNav}/>}
           {mobileNav && settings && (
            <MenuMobile nav={mobileNav} settings={settings} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
