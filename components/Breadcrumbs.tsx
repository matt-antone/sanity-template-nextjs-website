"use client";
import * as React from "react";
import BC from "@marketsystems/nextjs13-appdir-breadcrumbs";
import { titleCase } from "title-case";

interface IBreadcrumbsProps {
  title: string;
}

const Breadcrumbs: React.FunctionComponent<IBreadcrumbsProps> = ({title}) => {
  return (
    <div>
      <BC
        //styles are in globals.css
        containerClassName="breadcrumbs mt-2"
        listClassName="flex gap-4"
        inactiveItemClassName="text-sm text-darkblue relative"
        activeItemClassName="text-sm font-bold relative line-clamp-1"
        rootLabel="Home"
        // seperator={<span className="text-darkblue">/</span>}
        transformLabel={(title) => titleCase(title).replaceAll("-", " ")}
      />
    </div>
  );
};

export default Breadcrumbs;
