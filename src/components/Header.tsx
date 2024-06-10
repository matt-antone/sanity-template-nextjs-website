import * as React from "react";
import {
  SITE_SETTINGS_QUERY,
  HEADER_NAVIGATION_QUERY,
  MOBILE_NAVIGATION_QUERY,
} from "@/src/lib/queries";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Container from "./Container";
import Image from "next/image";
import MenuMain from "@/src/components/MenuMain";
import MenuMobile from "@/src/components/MenuMobile";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = async (props) => {
  // Fetch the site settings and navigation items
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  const mainNav = await client.fetch<SanityDocument>(HEADER_NAVIGATION_QUERY);
  const mobileNav = await client.fetch<SanityDocument>(MOBILE_NAVIGATION_QUERY);
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center py-4">
          <div>
            {settings?.siteLogo ? (
              <a href="/" className="text-xl font-bold block w-[200px]">
                <Image
                  src={settings?.siteLogo?.asset?.url}
                  width={settings.siteLogo.asset.metadata.dimensions.width}
                  height={settings.siteLogo.asset.metadata.dimensions.height}
                  alt={settings?.siteTitle || "Untitled"}
                />
              </a>
            ) : settings?.siteTitle ? (
              <a href="/" className="text-xl font-boldx]">
                {settings.siteTitle}
              </a>
            ) : (
              <a href="/studio/structure/settings" className="text-blue-500">Add website name</a>
            )}
          </div>
          {mainNav && <MenuMain nav={mainNav} />}
          {mobileNav && settings && (
            <MenuMobile nav={mobileNav} settings={settings} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
