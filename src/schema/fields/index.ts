import type { SchemaTypeDefinition } from "sanity";
import { body } from "./body-field";
import { categories } from "./categories-field";
import { date } from "./date-field";
import { description } from "./description-field";
import { email } from "./email-field";
import { gallery } from "./gallery-field";
import { image } from "./image-field";
import { localBusinessType } from "./local-business-type-field";
import { name } from "./name-field";
import { organizationType } from "./organization-type-field";
import { phone } from "./phone-field";
import { relatedProfiles } from "./related-profiles-field";
import { sections } from "./sections-field";
import { slug } from "./slug-field";
import { tags } from "./tags-field";
import { title } from "./title-field";
import { url } from "./url-field";
import * as custom from "./custom"

export {
  body,
  categories,
  date,
  description,
  email,
  gallery,
  image,
  localBusinessType,
  name,
  organizationType,
  phone,
  relatedProfiles,
  sections,
  slug,
  tags,
  title,
  url,
}
export * from "./custom"

export default [
  body,
  categories,
  date,
  description,
  email,
  gallery,
  image,
  name,
  phone,
  relatedProfiles,
  sections,
  slug,
  tags,
  title,
  url,
  ...Object.values(custom),
] as SchemaTypeDefinition[]


