import { type SchemaTypeDefinition } from 'sanity'
import {
  schema as types
} from '@/sanity/schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: types.types,
}
