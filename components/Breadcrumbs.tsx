"use client";
import * as React from "react";
import { titleCase } from "title-case";

interface IBreadcrumbsProps {
  title: string;
}

const Breadcrumbs: React.FunctionComponent<IBreadcrumbsProps> = ({title}) => {
  return (
    <div>
      breadcrumbs
    </div>
  );
};

export default Breadcrumbs;
