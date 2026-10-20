import {defineType} from 'sanity'

export default defineType({
  name: 'homeBanner',
  title: 'Banner de Inicio',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Imágenes del banner (3)',
      description: 'La tercera imagen define la proporción del banner. Mantén esa misma proporción en las tres diapositivas; se muestran completas dentro del marco. Sube imágenes de al menos 1600 px de ancho para evitar que se vean borrosas.',
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
      name: 'bannerLink',
      title: 'Enlace del banner',
      description: 'Destino al que se accede al hacer clic en cualquier parte del banner. Puede ser una ruta interna o una URL completa.',
      type: 'string',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'mobileImage1',
      title: 'Imagen para teléfono: diapositiva 1',
      description: 'Opcional. Si se agrega, debe tener la misma proporción que la imagen móvil de la diapositiva 3. Si no, se usa la versión de escritorio completa.',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'mobileImage2',
      title: 'Imagen para teléfono: diapositiva 2',
      description: 'Opcional. Si se agrega, debe tener la misma proporción que la imagen móvil de la diapositiva 3. Si no, se usa la versión de escritorio completa.',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'mobileImage3',
      title: 'Imagen para teléfono: diapositiva 3 (referencia de proporción móvil)',
      description: 'Opcional. Esta imagen define la proporción del banner en teléfonos. Mantén esa misma proporción en las imágenes móviles de las otras diapositivas. Si se deja vacía, se usa la proporción de escritorio de la diapositiva 3.',
      type: 'image',
      options: {hotspot: true},
    },
  ],
})
