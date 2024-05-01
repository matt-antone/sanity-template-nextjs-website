import * as React from "react";
import Container from "./Container";
import { client } from "@/sanity/lib/client";

import { FOOTER_NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/src/lib/queries";
import { QueryParams, SanityDocument } from "next-sanity";
import Link from "next/link";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = async (props) => {
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  const nav = await client.fetch<SanityDocument>(FOOTER_NAVIGATION_QUERY);
  
  return (
    <footer>
      <Container>
        <div className="flex justify-center items-center py-4 gap-4">
          <p>©{new Date().getFullYear()} {settings.siteTitle || "Untitled"}</p>
          <nav>
            <ul className="flex space-x-4">
              {nav.items &&
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
          </nav>{" "}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
