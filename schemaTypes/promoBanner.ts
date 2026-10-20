import {defineType} from 'sanity'

export default defineType({
  name: 'promoBanner',
  title: 'Banner Promocional',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Imagen (670 × 80 px recomendado)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mobileImage',
      title: 'Imagen para teléfono (750 × 1000 px recomendado)',
      description: 'Opcional. Se muestra en pantallas de teléfono; si se deja vacía, la imagen principal conserva su proporción original.',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'altText',
      title: 'Texto alternativo',
      description: 'Descripción accesible de la imagen; no se muestra sobre el banner.',
      type: 'string',
    },
  ],
})
