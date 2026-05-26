import { type SchemaTypeDefinition } from 'sanity'
// import { project } from './project'
import { works } from './works'
import { testimonials } from './testimonials'
import { about } from './about'
import comment from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [works, testimonials, about, comment],
}
