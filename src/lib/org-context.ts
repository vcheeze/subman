import { getRequestHeaders } from '@tanstack/react-start/server'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { member, session as sessionTable, subscription } from '@/db/schema'
import { auth } from '@/lib/auth'
import { personalOrgId } from '@/lib/org'
import { ensurePersonalOrganization } from '@/lib/org-server'

export async function requireOrgMembership(
	userId: string,
	organizationId: string,
) {
	const membership = await db.query.member.findFirst({
		where: and(
			eq(member.userId, userId),
			eq(member.organizationId, organizationId),
		),
	})

	if (!membership) {
		throw new Error('Forbidden')
	}

	return membership
}

export async function requireOrgContext() {
	const headers = getRequestHeaders()
	const session = await auth.api.getSession({ headers })

	if (!session?.user) {
		throw new Error('Unauthorized')
	}

	await ensurePersonalOrganization(session.user)

	let organizationId = session.session.activeOrganizationId
	if (!organizationId) {
		organizationId = personalOrgId(session.user.id)
		await db
			.update(sessionTable)
			.set({ activeOrganizationId: organizationId })
			.where(eq(sessionTable.id, session.session.id))
	}

	const membership = await db.query.member.findFirst({
		where: and(
			eq(member.userId, session.user.id),
			eq(member.organizationId, organizationId),
		),
	})

	if (!membership) {
		throw new Error('Forbidden')
	}

	return {
		user: session.user,
		session: session.session,
		organizationId,
		membership,
		userId: session.user.id,
	}
}

export async function requireOrgSubscription(subId: string) {
	const ctx = await requireOrgContext()
	const sub = await db.query.subscription.findFirst({
		where: and(
			eq(subscription.id, subId),
			eq(subscription.organizationId, ctx.organizationId),
		),
	})

	if (!sub) {
		throw new Error('Subscription not found')
	}

	return { ...ctx, subscription: sub }
}
