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
        containerClassName="breadcrumbs mt-4"
        listClassName="flex gap-4"
        inactiveItemClassName="text-sm text-gray-500 relative"
        activeItemClassName="text-sm font-bold relative"
        rootLabel="Home"
        transformLabel={(title) => titleCase(title).replaceAll("-", " ")}
      />
    </div>
  );
};

export default Breadcrumbs;
