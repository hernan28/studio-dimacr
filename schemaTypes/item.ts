import {defineType} from 'sanity'

export default defineType({
  name: 'item',
  type: 'document',
  title: 'Catalog Item',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Item Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subcategory',
      type: 'reference',
      to: [{type: 'subcategory'}],
      title: 'Subcategory',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'image'}],
      options: {layout: 'grid'},
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.precision(2).positive(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'sku',
      type: 'number',
      title: 'sku',
    },

    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'text',
          rows: 1,
        },
      ],
      initialValue: [''],
    },

    // TODO: Add Brand???
    // TODO: Add fields to handle offers, discounts, or other item-specific information as needed
  ],
})
