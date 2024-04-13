import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legal',
  title: 'Legal',
  type: 'document',
  fields: [
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
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { title: selection.title }
    },
  },
})
