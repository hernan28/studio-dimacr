import {defineType} from 'sanity'

export default defineType({
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Category Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Category Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mostSearched',
      type: 'boolean',
      title: 'Mostrar en "Más buscado"',
      description: 'Si está activo, esta categoría aparecerá en la sección de más buscados.',
      initialValue: false,
    },
  
  ]
})
