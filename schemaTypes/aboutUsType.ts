import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'Sobre Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutHeader',
      title: 'Encabezado superior (ej. ¿Quiénes somos?)',
      type: 'string',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Título principal (ej. Conócenos)',
      type: 'string',
    }),
    defineField({
      name: 'trajectoryLabel',
      title: 'Etiqueta secundaria (ej. Trayectoria)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto del botón',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})