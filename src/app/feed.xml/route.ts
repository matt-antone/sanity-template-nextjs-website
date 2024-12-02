import RSS from 'rss';
import { SITE_SETTINGS_QUERY } from '@/lib/queries';
import { SanityDocument } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import {toHTML} from '@portabletext/to-html'



export async function GET() {
  const settings = await loadQuery<SanityDocument>(SITE_SETTINGS_QUERY);
  const posts = await loadQuery<SanityDocument[]>(`*[_type == "post"] | order(publishedAt desc) {
    title,
    description,
    "slug": slug.current,
    publishedAt,
    body
  }`);

  const options = {
    title: settings.data?.siteTitle || "Untitled",
    description: settings.data?.description || '',
    feed_url: process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml` : '',
    site_url: process.env.NEXT_PUBLIC_BASE_URL || '',
  }
  const feed = new RSS(options);

  posts.data?.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      date: post.publishedAt,
      guid: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      categories: post.categories?.map((cat: any) => cat.title) || [],
      author: post.author?.name || settings.data?.author?.name || '',
      custom_elements: [
        { 'content:encoded': toHTML(post.body) || '' }
      ]
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml' },
  });

}
