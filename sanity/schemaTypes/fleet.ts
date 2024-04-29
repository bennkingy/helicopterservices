import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fleet',
  title: 'Fleet',
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
    name: 'workType',
    title: 'Work Type',
    type: 'object',
    fields: [
      {
        name: 'trainingHelicopter',
        title: 'Training Helicopter',
        type: 'boolean',
        initialValue: false,
      },
      {
        name: 'charterHelicopter',
        title: 'Charter Helicopter',
        type: 'boolean',
        initialValue: false,
      },
      {
        name: 'aerialWorkHelicopter',
        title: 'Aerial Work Helicopter',
        type: 'boolean',
        initialValue: false,
      }
    ]
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
      hidden: ({document}) => document?.isLandingPage === true,
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
      heroImage: 'hero.image',
      mainImage: 'mainImage',
    },
    // @ts-ignore
    prepare(selection, heroImage, mainImage) {
      return { title: selection.title,  media: heroImage || mainImage}
    },
  },
})
