import * as React from "react";
import Container from "./Container";
import { client } from "@/sanity/lib/client";

import {
  FOOTER_NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/lib/queries";
import { QueryParams, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";

interface IFooterProps {}

const Footer: React.FunctionComponent = async (props) => {
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  const nav = await client.fetch<SanityDocument>(FOOTER_NAVIGATION_QUERY);
  const locations = await client.fetch<any[]>(
    "*[_type == 'location'][0...100] | order(order asc)"
  );
  return (
    <footer className="bg-dark text-white py-16">
      <Container>
        {/* <nav>
          <ul className={`lg:flex gap-4 lg:text-center items-end`}>
            <li className="mb-8 lg:mb-0">
              <Link href="/">
                <span className="sr-only">Home</span>
                <Image
                  src="https://cdn.sanity.io/images/dyyjt70o/production/0784d741fd123a83a8e74e6a06795643dc76bced-530x110.svg"
                  width={155}
                  height={32}
                  alt="logo"
                  className=""
                />
              </Link>
            </li>
            {nav?.items &&
              nav.items.map((item: any) => {
                return (
                  <li key={`${item._key}-footer`}>
                    <Link
                      href={item.link || `/${item?.page?.slug?.current}`}
                      className=""
                    >
                      {item.text}{" "}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>{" "} */}
        <p className="text-xs text-right flex gap-4 justify-end items-center">
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/terms-of-use"}>Terms of Use</Link>
          <Link href={"/sitemap"}>Sitemap</Link>
          <span>
            ©{new Date().getFullYear()} {settings?.siteTitle || "Untitled"}
          </span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
