import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'training',
  title: 'Training',
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
      name: 'hero',
      type: 'hero',
      hidden: ({document}) => document?.isLandingPage !== true,
    }),
    defineField({
      name: 'service',
      title: 'Services',
      type: 'array',
      of: [{type: 'service'}],
      hidden: ({document}) => document?.isLandingPage !== true,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      hidden: ({document}) => document?.isLandingPage === true,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'gallery',
      type: 'gallery',
      hidden: ({document}) => document?.isLandingPage == true,
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
      heroImage: 'hero.image',
      mainImage: 'mainImage',
    },
    // @ts-ignore
    prepare(selection, heroImage, mainImage) {
      return { title: selection.title,  media: heroImage || mainImage}
    },
  },
})
