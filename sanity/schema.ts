import { type SchemaTypeDefinition } from 'sanity'
import { schemaTypes } from "../src/schema"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes.types,
}
