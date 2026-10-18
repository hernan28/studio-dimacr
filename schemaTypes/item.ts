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
      validation: Rule => Rule.required()
    },
    {
      name: 'subcategory',
      type: 'reference',
      to: [{type: 'subcategory'}],
      title: 'Subcategory',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'image'}],
      options: {layout: 'grid'}
    },
    {
      // This field is always dollar price
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'discountedPrice',
      type: 'number',
      title: 'Discounted Price',
      description: 'Optional sale price. The regular price remains the original price.',
      validation: Rule => Rule.min(0).custom((discountedPrice, context) => {
        if (typeof discountedPrice !== 'number') return true

        const price = (context.parent as {price?: number} | undefined)?.price
        return typeof price !== 'number' || discountedPrice < price || 'Discounted price must be lower than the regular price.'
      })
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
    // TODO: Add Brand??? 
  ]
})
