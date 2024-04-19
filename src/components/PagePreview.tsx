"use client";
import { PageDocument } from "@/src/types";
import { PAGE_QUERY } from "@/src/lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams } from "next-sanity";

import Page from "@/src/components/Page";

export default function PostPreview({
  initial,
  params
}: {
  initial: QueryResponseInitial<PageDocument>;
  params: QueryParams
}) {
  const { data } = useQuery<PageDocument | null>(
    PAGE_QUERY,
    params,
    { initial }
  );

  return data ? (
    <Page {...data} />
  ) : (
    <div className="bg-red-100">Post not found</div>
  );
}