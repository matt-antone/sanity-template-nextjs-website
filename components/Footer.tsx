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
    <footer className="mt-12 bg-white py-8">
      <Container>
        <p className="text-xs text-right flex gap-4 justify-center items-center">
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
