import { queryOptions } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '~/db'
import { category } from '~/db/schema'

export type PostType = {
  id: string
  title: string
  body: string
}

export const fetchCategories = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching categories...')
    const categories = await db.query.category.findMany()
    return categories
  },
)

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  })

export const fetchCategory = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`)
    const result = await db.query.category.findFirst({
      where: eq(category.id, data),
    })
    // throw notFound() if 404

    return result
  })

export const categoryQueryOptions = (categoryId: number) =>
  queryOptions({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategory({ data: categoryId }),
  })
