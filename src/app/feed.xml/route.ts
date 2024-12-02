import RSS from 'rss';
import { SITE_SETTINGS_QUERY } from '@/lib/queries';
import { SanityDocument } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import {toHTML} from '@portabletext/to-html'



export async function GET() {
  const settings = await loadQuery<SanityDocument>(SITE_SETTINGS_QUERY);
  const posts = await loadQuery<SanityDocument[]>(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    title,
    description,
    "slug": slug.current,
    publishedAt,
    body,
    "image": gallery[0].asset->,
    gallery[]{
     ...,
     asset->,
    },
  }`);

  const options = {
    title: settings.data?.siteTitle || "Untitled",
    description: settings.data?.description || 'no description',
    feed_url: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml` : '',
    site_url: process.env.NEXT_PUBLIC_BASE_URL || '',
    language: 'en',
    image_url: settings.data?.logo?.url || '',
    copyright: `Copyright ${new Date().getFullYear()} ${settings.data?.siteTitle || 'Untitled'}`,
    // managingEditor: settings.data?.author?.email || '',
    // webMaster: settings.data?.author?.email || '',
    ttl: 60,
    categories: settings.data?.categories?.map((cat: any) => cat.title) || [],
    custom_namespaces: {
      'content': 'http://purl.org/rss/1.0/modules/content/',
      'dc': 'http://purl.org/dc/elements/1.1/',
      'media': 'http://search.yahoo.com/mrss/',
      'atom': 'http://www.w3.org/2005/Atom'
    },
    pubDate: new Date().toUTCString(),
    generator: 'RSS for Node',
    docs: 'https://validator.w3.org/feed/docs/rss2.html'
  }
  const feed = new RSS(options);

  posts.data?.forEach((post) => {
    console.log(post.image)
    feed.item({
      title: post.title,
      description: post.description || 'no description',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      date: post.publishedAt,
      guid: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      categories: post.categories?.map((cat: any) => cat.title) || [],
      author: post.author?.name || settings.data?.author?.name || '',
      custom_elements: [
        { 'content:encoded': toHTML(post.body) || '' },
        { 'media:content': {
          _attr: {
            url: post.image?.url || '',
            medium: 'image',
            type: 'image/jpeg'
          }
        }}
      ]
      ,
      enclosure: post.mainImage?.url ? {
        url: post.mainImage.url,
        type: 'image/jpeg'
      } : undefined,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml' },
  });

}
