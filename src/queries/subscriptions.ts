import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { subscription } from '@/db/schema'
import type { SubscriptionFormData } from '@/routes/_authed/subs.add'

export type PostType = {
	id: string
	title: string
	body: string
}

export const fetchSubscriptionById = createServerFn({ method: 'GET' })
	.inputValidator((data: { subId: string; userId: string }) => data)
	.handler(async ({ data: { subId, userId } }) => {
		console.info('Fetching subscription by ID...')
		const sub = await db.query.subscription.findFirst({
			where: eq(subscription.id, subId),
		})
		if (sub?.userId !== userId) {
			throw new Error('Subscription not found')
		}
		return sub
	})

export const subscriptionByIdQueryOptions = (subId: string, userId: string) =>
	queryOptions({
		queryKey: ['subscription', subId],
		queryFn: () => fetchSubscriptionById({ data: { subId, userId } }),
	})

export const fetchSubscriptions = createServerFn({ method: 'GET' })
	.inputValidator((d: string) => d)
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

export const upsertSubscription = createServerFn({ method: 'POST' })
	.inputValidator(
		(d: { values: SubscriptionFormData; userId: string; subId?: string }) => d,
	)
	.handler(async ({ data: { values, userId, subId } }) => {
		console.info('Adding subscription...')
		console.log('values, userId, subId :>> ', values, userId, subId)
		let sub
		if (subId) {
			// TODO update
			sub = await db
				.update(subscription)
				.set(values)
				.where(eq(subscription.id, subId))
				.returning()
		} else {
			sub = await db.insert(subscription).values({ ...values, userId })
		}

		console.log('sub :>> ', sub)

		return sub
	})

export const upsertSubscriptionMutationOptions = (data: {
	values: SubscriptionFormData
	userId: string
	subId?: string
}) => ({
	mutationKey: ['upsertSubscription'],
	mutationFn: () => upsertSubscription({ data }),
})
