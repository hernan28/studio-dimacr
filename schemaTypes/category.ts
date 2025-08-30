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
      name: 'mostSearched',
      type: 'boolean',
      title: 'Mostrar en Más Buscado',
      description: 'Muestra esta categoría en la sección de Más buscado por categoría',
      initialValue: false
    },
    {
      name: 'image',
      type: 'image',
      title: 'Imagen de la categoría',
      options: {
        hotspot: true
      }
    }
  ]
})
