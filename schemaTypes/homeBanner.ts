import {defineType} from 'sanity'

export default defineType({
  name: 'homeBanner',
  title: 'Banner de Inicio',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Imágenes del banner (3)',
      description: 'Usa imágenes panorámicas; se recomienda un tamaño aproximado de 1920 × 600 px.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      options: {layout: 'grid'},
      validation: (Rule) => Rule.required().length(3),
    },
    {
      name: 'mobileImage1',
      title: 'Imagen para teléfono: diapositiva 1 (750 × 1000 px recomendado)',
      description: 'Opcional. Si se deja vacía, se usa la imagen panorámica de la diapositiva 1.',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'mobileImage2',
      title: 'Imagen para teléfono: diapositiva 2 (750 × 1000 px recomendado)',
      description: 'Opcional. Si se deja vacía, se usa la imagen panorámica de la diapositiva 2.',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'mobileImage3',
      title: 'Imagen para teléfono: diapositiva 3 (750 × 1000 px recomendado)',
      description: 'Opcional. Si se deja vacía, se usa la imagen panorámica de la diapositiva 3.',
      type: 'image',
      options: {hotspot: true},
    },
  ],
})
