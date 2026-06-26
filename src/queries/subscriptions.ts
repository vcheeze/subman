import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { and, count, eq, inArray } from 'drizzle-orm'

import { db } from '@/db'
import { member, organization, subscription } from '@/db/schema'
import { orgDisplayName } from '@/lib/org'
import {
	requireOrgContext,
	requireOrgMembership,
	requireOrgSubscription,
} from '@/lib/org-context'
import type { SubscriptionFormData } from '@/routes/_authed/subs.add'

export const fetchSubscriptionById = createServerFn({ method: 'GET' })
	.inputValidator((data: { subId: string }) => data)
	.handler(async ({ data: { subId } }) => {
		const { subscription: sub } = await requireOrgSubscription(subId)
		return sub
	})

export const subscriptionByIdQueryOptions = (
	subId: string,
	organizationId: string,
) =>
	queryOptions({
		queryKey: ['subscription', organizationId, subId],
		queryFn: () => fetchSubscriptionById({ data: { subId } }),
	})

export const fetchSubscriptions = createServerFn({ method: 'GET' }).handler(
	async () => {
		const { organizationId } = await requireOrgContext()
		return db.query.subscription.findMany({
			where: eq(subscription.organizationId, organizationId),
		})
	},
)

export const subscriptionsQueryOptions = (organizationId: string) =>
	queryOptions({
		queryKey: ['subscriptions', organizationId],
		queryFn: () => fetchSubscriptions(),
	})

export const fetchUserSubscriptionCount = createServerFn({
	method: 'GET',
}).handler(async () => {
	const { userId } = await requireOrgContext()

	const memberships = await db.query.member.findMany({
		where: eq(member.userId, userId),
		columns: { organizationId: true },
	})

	const organizationIds = memberships.map(
		(membership) => membership.organizationId,
	)

	if (organizationIds.length === 0) {
		return { count: 0 }
	}

	const [result] = await db
		.select({ count: count() })
		.from(subscription)
		.where(inArray(subscription.organizationId, organizationIds))

	return { count: result?.count ?? 0 }
})

export const upsertSubscription = createServerFn({ method: 'POST' })
	.inputValidator(
		(d: { values: SubscriptionFormData; subId?: string }) => d,
	)
	.handler(async ({ data: { values, subId } }) => {
		const { organizationId, userId } = await requireOrgContext()
		const normalizedValues = {
			...values,
			startDate: values.startDate || null,
		}

		if (subId) {
			const result = await db
				.update(subscription)
				.set({ ...normalizedValues, updatedAt: new Date() })
				.where(
					and(
						eq(subscription.id, subId),
						eq(subscription.organizationId, organizationId),
					),
				)
				.returning()

			if (result.length === 0) {
				throw new Error('Subscription not found')
			}

			return result
		}

		return db
			.insert(subscription)
			.values({
				...normalizedValues,
				userId,
				organizationId,
				createdByUserId: userId,
			})
			.returning()
	})

export const upsertSubscriptionMutationOptions = (data: {
	values: SubscriptionFormData
	subId?: string
}) => ({
	mutationKey: ['upsertSubscription'],
	mutationFn: () => upsertSubscription({ data }),
})

export const updateSubscriptionStatus = createServerFn({ method: 'POST' })
	.inputValidator((d: { subId: string; isActive: boolean }) => d)
	.handler(async ({ data: { subId, isActive } }) => {
		const { organizationId } = await requireOrgContext()

		const response = await db
			.update(subscription)
			.set({ isActive, updatedAt: new Date() })
			.where(
				and(
					eq(subscription.id, subId),
					eq(subscription.organizationId, organizationId),
				),
			)
			.returning()

		if (response.length === 0) {
			throw new Error('Subscription not found')
		}

		return response[0]
	})

export const updateSubscriptionStatusMutationOptions = (data: {
	subId: string
	isActive: boolean
}) => ({
	mutationKey: ['updateSubscriptionStatus'],
	mutationFn: () => updateSubscriptionStatus({ data }),
})

export const deleteSubscription = createServerFn({ method: 'POST' })
	.inputValidator((d: { subId: string }) => d)
	.handler(async ({ data: { subId } }) => {
		const { organizationId } = await requireOrgContext()

		const response = await db
			.delete(subscription)
			.where(
				and(
					eq(subscription.id, subId),
					eq(subscription.organizationId, organizationId),
				),
			)

		return { success: true, deleteCount: response.rowCount }
	})

export const deleteSubscriptionMutationOptions = (data: { subId: string }) => ({
	mutationKey: ['deleteSubscription'],
	mutationFn: () => deleteSubscription({ data }),
})

export const fetchMoveTargetOrganizations = createServerFn({
	method: 'GET',
}).handler(async () => {
	const { organizationId, userId } = await requireOrgContext()

	const memberships = await db
		.select({
			id: organization.id,
			name: organization.name,
			metadata: organization.metadata,
		})
		.from(member)
		.innerJoin(organization, eq(member.organizationId, organization.id))
		.where(eq(member.userId, userId))

	return memberships
		.filter((org) => org.id !== organizationId)
		.map((org) => ({
			id: org.id,
			name: orgDisplayName(org),
		}))
})

export const moveTargetOrganizationsQueryOptions = (organizationId: string) =>
	queryOptions({
		queryKey: ['moveTargetOrganizations', organizationId],
		queryFn: () => fetchMoveTargetOrganizations(),
	})

export const moveSubscription = createServerFn({ method: 'POST' })
	.inputValidator(
		(d: { subId: string; targetOrganizationId: string }) => d,
	)
	.handler(async ({ data: { subId, targetOrganizationId } }) => {
		const { organizationId: sourceOrganizationId, userId } =
			await requireOrgContext()

		if (targetOrganizationId === sourceOrganizationId) {
			throw new Error('Subscription is already in this workspace')
		}

		await requireOrgMembership(userId, targetOrganizationId)
		await requireOrgSubscription(subId)

		const result = await db
			.update(subscription)
			.set({
				organizationId: targetOrganizationId,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(subscription.id, subId),
					eq(subscription.organizationId, sourceOrganizationId),
				),
			)
			.returning()

		if (result.length === 0) {
			throw new Error('Subscription not found')
		}

		return {
			subscription: result[0],
			sourceOrganizationId,
			targetOrganizationId,
		}
	})
