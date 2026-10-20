import {useClient, useFormValue, type ReferenceInputProps} from 'sanity'
import {useEffect, useState} from 'react'

export default function SubcategoryInput(props: ReferenceInputProps) {
  const client = useClient({apiVersion: '2025-01-01'})
  const categoryValue = useFormValue(['category'])
  const categoryId =
    categoryValue && typeof categoryValue === 'object' && '_ref' in categoryValue
      ? String(categoryValue._ref)
      : undefined
  const [hasSubcategories, setHasSubcategories] = useState<boolean | null>(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoadError(false)

    if (!categoryId) {
      setHasSubcategories(false)
      return () => {
        cancelled = true
      }
    }

    setHasSubcategories(null)
    client
      .fetch<boolean>(
        'count(*[_type == "subcategory" && category._ref == $categoryId]) > 0',
        {categoryId},
      )
      .then(result => {
        if (!cancelled) setHasSubcategories(result)
      })
      .catch(error => {
        console.error('No se pudieron cargar las subcategorías de la categoría:', error)
        if (!cancelled) {
          setLoadError(true)
          setHasSubcategories(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [categoryId, client])

  if (!categoryId || hasSubcategories === false) return null

  return (
    <>
      {loadError && (
        <p role="alert" className="text-sm text-red-600">
          No se pudo comprobar la categoría. Las subcategorías disponibles se muestran filtradas.
        </p>
      )}
      {props.renderDefault(props)}
    </>
  )
}
