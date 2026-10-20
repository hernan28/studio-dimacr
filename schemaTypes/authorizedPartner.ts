import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'authorizedPartner',
  title: 'Marca autorizada',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Tipo de autorización',
      type: 'string',
      options: {
        list: [
          {title: 'Distribuidor autorizado', value: 'distributor'},
          {title: 'Centro de servicio autorizado', value: 'serviceCenter'},
          {title: 'Agente autorizado', value: 'agent'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Sitio web',
      description: 'Puedes pegar el dominio (www.ejemplo.com) o la URL completa (https://www.ejemplo.com).',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (typeof value !== 'string') return 'Ingresa un sitio web válido.'

          try {
            const url = new URL(
              /^https?:\/\//i.test(value) ? value : `https://${value}`,
            )
            return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.')
              ? true
              : 'Ingresa un dominio o una URL HTTP/HTTPS válida.'
          } catch {
            return 'Ingresa un dominio o una URL HTTP/HTTPS válida.'
          }
        }),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la marca',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
  },
})
