import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'flights',
  title: 'Flights',
  type: 'document',
  fields: [
    defineField({
      name: 'isLandingPage',
      title: 'Main page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Services',
      type: 'array',
      of: [{type: 'service'}],
      hidden: ({document}) => document?.isLandingPage !== true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      return { title: selection.title, media: selection.media }
    },
  },
})
