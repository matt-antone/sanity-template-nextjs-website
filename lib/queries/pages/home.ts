import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`*[_type == "home"][0]{
  ...,
  gallery[]{
    ...,
    asset->{
      ...,
    }
  },
  "images": *[_type == "sanity.imageAsset"]| order(_createdAt desc)[0...9]{
    ...,
  },
  "posts": *[_type == "post"]| order(_createdAt desc)[0...3]{
    ...,
    gallery[]{
      ...,
      asset->{
        ...,
      }
    }
  },
  "guides": *[_type == "guide"]| order(_createdAt desc)[0...3]{
    ...,
    gallery[]{
      ...,
      asset->{
        ...,
      }
    }
  }
}`;
