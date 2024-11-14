import { Box as SanityBox } from "@sanity/ui";

export const gallery = {
  name: 'gallery',
  title: 'Gallery',
  type: 'array',
  description: 'Add a gallery of images. The first image will be used as the featured image.',
  of: [{ type: 'image' }],
}