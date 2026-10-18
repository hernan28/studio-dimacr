import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'searchSettings',
  title: 'Búsquedas sugeridas',
  type: 'document',
  fields: [
    defineField({
      name: 'terms',
      title: 'Términos sugeridos',
      description: 'Agrega y ordena los términos que aparecerán en el buscador del sitio.',
      type: 'array',
      of: [{type: 'string', validation: Rule => Rule.required().max(200).custom(value =>
        typeof value === 'string' && value.trim() ? true : 'Escribe un término de búsqueda.'
      )}],
      validation: Rule => Rule.required().min(1).max(10).unique(),
    }),
  ],
  initialValue: {
    terms: ['Cámaras', 'Binoculares', 'Lentes', 'Maletín', 'Trípode'],
  },
  preview: {
    prepare() {
      return {title: 'Búsquedas sugeridas'}
    },
  },
})
