import type { SchemaTypeDefinition } from 'sanity'
import custom from './custom'
import { galleryBlock } from './gallery-block'
import { linkImage } from './image-link-block'
import { vimeo } from './vimeo-block'
import { youtube } from './youtube-block'

// Use the custom folder for any custom blocks
// Duplicate types there will override the default ones here
export default [
  youtube,
  linkImage,
  galleryBlock,
  vimeo,
  ...Object.values(custom),
] as SchemaTypeDefinition[]
