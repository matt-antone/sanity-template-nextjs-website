"use client";
import React from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Hits,
  Pagination,
} from "react-instantsearch";
import page from "@/src/schema/page";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

const paginationClasses = {
  root: "mb-12", //The root element of the widget.
  noRefinementRoot: "", //The root element when there are no refinements.
  list: "flex gap-8", //The list element.
  item: "", //Each item element.
  firstPageItem: "", //The first page element.
  previousPageItem: "", //The previous page element.
  pageItem: "", //Each page element.
  selectedItem: "", //The selected page element.
  disabledItem: "", //Each disabled page element.
  nextPageItem: "", //The next page element.
  lastPageItem: "", //The last page element.
  link: "", //The link of each item.
};

function Hit({ hit }: any) {
  return (
    <a href={`/posts/${hit.slug}`}>
    <article className="mb-6">
      <header>
        <time>{new Date(hit.date).toLocaleDateString('en-US')}</time>
        <h1 className="text-xl">{hit.title}</h1>
      </header>
      <p>{hit.excerpt || hit.body}</p>
    </article>
    </a>
  );
}

export default function LayoutPostsAlgolia() {
  return (
    <InstantSearch indexName="posts" searchClient={searchClient}>
      {/* Widgets */}
      <Configure
        analytics={false}
        // filters="free_shipping:true"
        hitsPerPage={10}
        attributesToRetrieve={[
          "title", // list of attributes to retrieve
          "slug",
          "image",
          "excerpt",
          "date",
        ]}
      />
      <Pagination classNames={paginationClasses} />
      <Hits hitComponent={Hit} />
      <Pagination classNames={paginationClasses} />
    </InstantSearch>
  );
}
