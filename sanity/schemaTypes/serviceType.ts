// ./schemas/heroType.ts

import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  type: 'object',
  title: 'Service',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'heading',
      image: 'image',
    },
    prepare({title, image}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Service',
        media: image || DocumentTextIcon,
      }
    },
  },
})