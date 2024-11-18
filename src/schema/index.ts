import { SchemaTypeDefinition } from 'sanity'
import * as types from './content-types'
import * as blocks from './blocks'

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    ...Object.values(blocks),
    ...Object.values(types),
  ],
}
