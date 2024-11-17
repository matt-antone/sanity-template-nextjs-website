import type { SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import {category} from './category-type'
import {home} from './home-type'
import {navigation} from './navigation-type'
import {page} from './page-type'
import {post} from './post-type'
import {profile} from './profile-type'
import {settings} from './settings-type'
import {tag} from './tag-type'
import {testimonial} from './testimonial-type'
import blocks from '../blocks'
import custom from './custom'

export {
  category,
  home,
  navigation,
  page,
  post,
  profile,
  settings,
  tag,
  testimonial,
  blockContent,
}

export * from './custom';


const schemas = [
  ...blocks,
  blockContent,
  home,
  navigation,
  page,
  post,
  profile,
  testimonial,
  settings,
  category,
  tag,
  ...Object.values(custom)
] as SchemaTypeDefinition[];

export default schemas;
