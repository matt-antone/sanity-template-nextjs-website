import type { SchemaTypeDefinition } from 'sanity'
// import { galleryBlock } from './gallery-block'
// import { linkImage } from './image-link-block'
// import { vimeo } from './vimeo-block'
// import { youtube } from './youtube-block'
// // Use the custom folder for any custom blocks
// // Duplicate types there will override the default ones here

// // Default blocks
// export {
//   galleryBlock,
//   linkImage,
//   vimeo,
//   youtube,
// }
// // Custom blocks
// export * from './custom';

// // Export all blocks
// export default [
//   youtube,
//   linkImage,
//   galleryBlock,
//   vimeo,
// ] as SchemaTypeDefinition[]
export * from './gallery-block';
export * from './image-link-block';
export * from './youtube-block';
export * from './vimeo-block';
export * from './custom'
