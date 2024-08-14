import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client'
export type { Metadata, ResolvingMetadata } from 'next'
import type { PortableTextBlock } from "sanity";

export type { Viewport } from 'next'

export type MetaDataProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type PostDocument = SanityDocument &{
  title: string;
  excerpt: string;
}

export type PageDocument = SanityDocument & {
  title: string;
}

export type SettingsDocument = SanityDocument & {
  siteTitle: string;
  siteDescription: string;
  siteLogo: SanityImageAssetDocument;
}