import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

import { db } from '~/db'
import { subscription } from '~/db/schema'
import type { SubscriptionFormData } from '~/routes/_authed/subs.add'

export type PostType = {
  id: string
  title: string
  body: string
}

export const fetchSubscriptions = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(async ({ data: userId }) => {
    console.info('Fetching subscriptions...')
    const subscriptions = await db.query.subscription.findMany({
      where: eq(subscription.userId, userId),
    })
    return subscriptions
  })

export const subscriptionsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['subscriptions', userId],
    queryFn: () => fetchSubscriptions({ data: userId }),
  })

export const addSubscription = createServerFn({ method: 'POST' })
  .validator((d: SubscriptionFormData & { userId: string }) => d)
  .handler(async ({ data }) => {
    console.info('Adding subscription...')
    const sub = await db.insert(subscription).values(data)

    return sub
  })

export const addSubscriptionMutationOptions = (
  data: SubscriptionFormData & { userId: string },
) => ({
  mutationKey: ['addSubscription'],
  mutationFn: () => addSubscription({ data }),
})
