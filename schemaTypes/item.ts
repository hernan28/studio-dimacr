import {defineType} from 'sanity'
import SubcategoryInput from './SubcategoryInput'

export default defineType({
  name: 'item',
  type: 'document',
  title: 'Catalog Item',
  fields: [
    {
      name: 'brand',
      type: 'string',
      title: 'Brand',
      description: 'La marca del producto. Se muestra antes del nombre como “Marca - Producto”.',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Item Name',
      description: 'Escribe el nombre o modelo sin repetir la marca.',
      validation: Rule => Rule.required()
    },
    {
      name: 'variantType',
      type: 'string',
      title: 'Tipo de opciones',
      description: 'Elige si el producto tiene colores y tamaños de fondo o monturas de lente.',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Producto estándar', value: 'standard'},
          {title: 'Fondo de color', value: 'background'},
          {title: 'Lente con monturas', value: 'lensMount'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      title: 'Category',
      description: 'Use this when the item belongs directly to a category and has no subcategory.',
    },
    {
      name: 'subcategory',
      type: 'reference',
      to: [{type: 'subcategory'}],
      title: 'Subcategory',
      components: {
        input: SubcategoryInput,
      },
      options: {
        filter: ({document}) => {
          const categoryId =
            document.category &&
            typeof document.category === 'object' &&
            '_ref' in document.category
              ? document.category._ref
              : undefined

          return categoryId
            ? {
                filter: 'category._ref == $categoryId',
                params: {categoryId},
              }
            : {filter: '_id == $categoryId', params: {categoryId: ''}}
        },
      },
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
      hidden: ({document}) =>
        document?.variantType === 'background' || document?.variantType === 'lensMount',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (
            context.document?.variantType === 'background' ||
            context.document?.variantType === 'lensMount'
          ) return true
          return typeof value === 'number' && value >= 0
            ? true
            : 'Ingresa un precio válido para el producto.'
        }),
    },
    {
      name: 'availabilityInquiry',
      type: 'boolean',
      title: 'Consultar disponibilidad en lugar del precio',
      description: 'Activa esta opción para ocultar el precio y mostrar “Consultar disponibilidad”.',
      initialValue: false,
      hidden: ({document}) =>
        document?.variantType === 'background' || document?.variantType === 'lensMount',
    },
    {
      name: 'variants',
      type: 'array',
      title: 'Opciones y variantes',
      description: 'Fondos: crea una entrada por cada combinación de color y tamaño. Lentes: crea una entrada por montura. Cada entrada tiene su propio precio e imagen.',
      hidden: ({document}) =>
        !document?.variantType || document.variantType === 'standard',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'color',
              type: 'string',
              title: 'Color del fondo',
              hidden: ({document}) => document?.variantType !== 'background',
              validation: Rule =>
                Rule.custom((value, context) =>
                  context.document?.variantType !== 'background' || (typeof value === 'string' && value.trim())
                    ? true
                    : 'Ingresa el color del fondo.',
                ),
            },
            {
              name: 'size',
              type: 'string',
              title: 'Tamaño',
              hidden: ({document}) => document?.variantType !== 'background',
              validation: Rule =>
                Rule.custom((value, context) =>
                  context.document?.variantType !== 'background' || (typeof value === 'string' && value.trim())
                    ? true
                    : 'Ingresa el tamaño del fondo.',
                ),
            },
            {
              name: 'mount',
              type: 'string',
              title: 'Tipo de montura',
              hidden: ({document}) => document?.variantType !== 'lensMount',
              validation: Rule =>
                Rule.custom((value, context) =>
                  context.document?.variantType !== 'lensMount' || (typeof value === 'string' && value.trim())
                    ? true
                    : 'Ingresa el tipo de montura.',
                ),
            },
            {
              name: 'price',
              type: 'number',
              title: 'Precio',
              validation: Rule => Rule.required().min(0),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Imagen de esta opción',
              options: {hotspot: true},
              validation: Rule => Rule.required(),
            },
          ],
          preview: {
            select: {
              variantType: 'variantType',
              color: 'color',
              size: 'size',
              mount: 'mount',
              price: 'price',
              media: 'image',
            },
            prepare({color, size, mount, price, media}) {
              return {
                title: [color, size, mount].filter(Boolean).join(' - ') || 'Opción',
                subtitle: typeof price === 'number' ? `$${price.toFixed(2)}` : undefined,
                media,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.custom((variants, context) => {
        if (
          context.document?.variantType !== 'background' &&
          context.document?.variantType !== 'lensMount'
        ) return true
        return Array.isArray(variants) && variants.length > 0
          ? true
          : 'Agrega al menos una opción y completa todas sus variantes.'
      }),
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
    },
    {
      name: 'descriptionLinks',
      type: 'array',
      title: 'Enlaces de la descripción',
      description: 'Añade enlaces como fichas técnicas. Define el texto visible y la URL para cada enlace.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Texto del enlace',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
            },
          },
        },
      ],
    }
    // TODO: Add fields to handle offers, discounts, or other item-specific information as needed
  ],
  validation: Rule =>
    Rule.custom((document) =>
      document?.category || document?.subcategory
        ? true
        : 'Selecciona una categoría o subcategoría para el artículo.',
    ),
})
