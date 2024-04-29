import { defineField, defineType } from 'sanity'

defineType({
  name: 'specification',
  title: 'Specification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The specification detail, e.g., "500 km" for range or "10 passengers" for capacity.',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Unit of measurement, e.g., km, kg, liters. Optional and can be used if the value includes a numeric measurement.',
      options: {
        list: ['km', 'kg', 'liters', 'meters', 'people', '', 'hours'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the specification for further clarification.',
    }),
  ],
})

export default defineType({
  name: 'helicopter',
  title: 'Helicopters',
  type: 'document',
  fields: [
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'model',
        maxLength: 96,
      },
    }),
    // defineField({
    //   name: 'manufacturer',
    //   title: 'Manufacturer',
    //   type: 'reference',
    //   to: {type: 'manufacturer'},
    // }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // defineField({
    //   name: 'specifications',
    //   title: 'Specifications',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'specification'}}],
    // }),
    defineField({
      name: 'topSpeed',
      title: 'Top Speed',
      type: 'number',
      description: 'Maximum speed in km/h',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Number of passengers the helicopter can carry',
    }),
    defineField({
      name: 'introducedAt',
      title: 'Introduced at',
      type: 'datetime',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'model',
      media: 'mainImage',
    },
    prepare(selection) {
      return { title: selection.title, media: selection.media }
    },
  },
})
