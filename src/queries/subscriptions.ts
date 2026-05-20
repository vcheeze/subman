import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

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
		if (subId) {
			return await db
				.update(subscription)
				.set({ ...values, updatedAt: new Date() })
				.where(and(eq(subscription.id, subId), eq(subscription.userId, userId)))
				.returning()
		} else {
			return await db
				.insert(subscription)
				.values({ ...values, userId })
				.returning()
		}
	})

export const upsertSubscriptionMutationOptions = (data: {
	values: SubscriptionFormData
	userId: string
	subId?: string
}) => ({
	mutationKey: ['upsertSubscription'],
	mutationFn: () => upsertSubscription({ data }),
})

export const updateSubscriptionStatus = createServerFn({ method: 'POST' })
	.inputValidator(
		(d: { userId: string; subId: string; isActive: boolean }) => d,
	)
	.handler(async ({ data: { userId, subId, isActive } }) => {
		try {
			const response = await db
				.update(subscription)
				.set({ isActive, updatedAt: new Date() })
				.where(and(eq(subscription.id, subId), eq(subscription.userId, userId)))
				.returning()

			if (response.length === 0) {
				throw new Error('Subscription not found')
			}

			return response[0]
		} catch (error) {
			console.error('Error updating subscription status:', error)
			throw new Error('Failed to update subscription status')
		}
	})

export const updateSubscriptionStatusMutationOptions = (data: {
	userId: string
	subId: string
	isActive: boolean
}) => ({
	mutationKey: ['updateSubscriptionStatus'],
	mutationFn: () => updateSubscriptionStatus({ data }),
})

export const deleteSubscription = createServerFn({ method: 'POST' })
	.inputValidator((d: { userId: string; subId: string }) => d)
	.handler(async ({ data: { userId, subId } }) => {
		try {
			const response = await db
				.delete(subscription)
				.where(and(eq(subscription.id, subId), eq(subscription.userId, userId)))
			return { success: true, deleteCount: response.rowCount }
		} catch (error) {
			console.error('Error deleting subscription:', error)
			throw new Error('Failed to delete subscription')
		}
	})

export const deleteSubscriptionMutationOptions = (data: {
	userId: string
	subId: string
}) => ({
	mutationKey: ['deleteSubscription'],
	mutationFn: () => deleteSubscription({ data }),
})
