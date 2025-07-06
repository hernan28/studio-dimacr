import {defineType} from 'sanity'

export default defineType({
  name: 'subcategory',
  type: 'document',
  title: 'Subcategory',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Subcategory Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      title: 'Parent Category',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
})
