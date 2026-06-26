import { createHash } from 'node:crypto'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { member, organization } from '@/db/schema'
import {
	invitationAcceptPath,
	personalMemberId,
	personalOrgId,
	personalOrgName,
} from '@/lib/org'

function personalOrgSlug(userId: string) {
	return `personal-${createHash('md5').update(userId).digest('hex')}`
}

export function buildInvitationUrl(invitationId: string) {
	const baseUrl =
		process.env.BETTER_AUTH_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'
	return `${baseUrl}${invitationAcceptPath(invitationId)}`
}

type PersonalOrgUser = {
	id: string
	name: string
	email: string
}

/** Creates a solo workspace for the user if it does not exist yet. */
export async function ensurePersonalOrganization(user: PersonalOrgUser) {
	const orgId = personalOrgId(user.id)
	const existing = await db.query.organization.findFirst({
		where: eq(organization.id, orgId),
	})

	if (existing) {
		return existing
	}

	const [created] = await db
		.insert(organization)
		.values({
			id: orgId,
			name: personalOrgName(user.name, user.email),
			slug: personalOrgSlug(user.id),
			metadata: JSON.stringify({ type: 'personal' }),
			createdAt: new Date(),
		})
		.onConflictDoNothing()
		.returning()

	const org =
		created ??
		(await db.query.organization.findFirst({
			where: eq(organization.id, orgId),
		}))

	if (!org) {
		throw new Error('Failed to create personal organization')
	}

	await db
		.insert(member)
		.values({
			id: personalMemberId(user.id),
			organizationId: orgId,
			userId: user.id,
			role: 'owner',
			createdAt: new Date(),
		})
		.onConflictDoNothing()

	return org
}
