import { SchemaTypeDefinition } from 'sanity'
import types from './content-types'
import blocks from './objects'

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    ...types,
    /* object types */
    // ...blocks,
  ],
}
