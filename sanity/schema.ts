import { type SchemaTypeDefinition } from 'sanity'
import { schemaTypes } from "../lib/schema"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes.types,
}
