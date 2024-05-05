// imageGallery.js

import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const imageGalleryType = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    },
    // {
    //   name: 'galleryType',
    //   type: 'string',
    //   title: 'Type of Gallery',
    //   description: 'Select the type of gallery that best describes the content.',
    //   options: {
    //     layout: 'radio', // Using radio buttons to ensure only one option can be selected
    //     list: [
    //       { title: 'Gallery', value: 'gallery' },
    //       { title: 'Single Gallery', value: 'single gallery' },
    //       { title: 'Video', value: 'video' },
    //       { title: '3D Video', value: '3d video' }
    //     ],
    //   },
    // },
  ],
  icon: ImagesIcon,
  preview: {
    select: {
      images: 'images',
    },
    prepare({images}) {
      return {
        title: images
          ? `${images.length === 1 ? `1 image` : `${images.length} images`} `
          : 'No images',
        subtitle: 'Gallery',
        media: images ? images[0] : ImagesIcon,
      }
    },
  },
})