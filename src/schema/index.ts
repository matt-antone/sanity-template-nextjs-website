import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import posts from './posts'
import category from './category'
import pages from './page'
import { youtube } from './fields/youtube'
import settings from './settings'
import { linkImage } from './fields/image-link'
import {navigation} from './navigation'
import { link } from './navigation/link'
import {navItem} from './navigation/navItem'
import { vimeo } from './fields/vimeo'
import profile from './profile'
import home from './home'
import { gallery } from './fields/gallery'
import testimonial from './testimonial'

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    /* singletons */
    home,
    settings,

    /* post types */
    pages,
    posts,
    profile,
    testimonial,

    /* object types */
    category,
    youtube,
    linkImage,
    navigation,
    link,
    navItem,
    vimeo,
    gallery,
    blockContent,
  ],
}
