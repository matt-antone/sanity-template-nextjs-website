import * as React from "react";
import {
  HEADER_NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/src/lib/queries";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = async (props) => {
  // Fetch the site settings and navigation items
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  const nav = await client.fetch<SanityDocument>(HEADER_NAVIGATION_QUERY);
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center py-4">
          <div>
            <a href="/" className="text-xl font-bold block w-[200px]">
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
          </div>
          <nav>
            <ul className="flex space-x-4">
              {nav && nav.items &&
                nav.items.map((item: any) => {
                  return (
                    <li key={item._id}>
                      <Link href={item.link || `/${item?.page?.slug?.current}`}>
                        {item.text}{" "}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
