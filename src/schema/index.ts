export * from './blockContent'
export * from './posts'
export * from './category'
export * from './page'
export * from './fields/youtube'
export * from './settings'
export * from './fields/image-link'
export * from './navigation'
export * from './navigation/link'
export * from './navigation/navItem'
export * from './fields/vimeo'

import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import posts from './posts'
import category from './category'
import pages from './page'
import { youtube } from './fields/youtube'
import settings from './settings'
import { linkImage } from './fields/image-link'
import navigation from './navigation'
import navLink from './navigation/link'
import navItem from './navigation/navItem'
import { vimeo } from './fields/vimeo'
import profile from './profile'
import home from './home'
export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    /* singletons */
    home,
    settings,

    /* post types */
    pages,
    posts,
    profile,

    /* object types */
    blockContent,
    category,
    youtube,
    linkImage,
    navigation,
    navLink,
    navItem,
    vimeo,

  ],
}
