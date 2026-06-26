import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { invitation, member, organization, user } from '@/db/schema'
import { buildInvitationUrl } from '@/lib/org-server'

export type PublicInvitationPreview = {
	id: string
	email: string
	organizationName: string
	inviterName: string
	inviterEmail: string
	expiresAt: string
}

export type PublicInvitationPreviewError =
	| 'not_found'
	| 'expired'
	| 'not_pending'
	| 'inviter_gone'

export const fetchInvitationUrl = createServerFn({ method: 'GET' })
	.inputValidator((data: { invitationId: string }) => data)
	.handler(async ({ data: { invitationId } }) => {
		return { url: buildInvitationUrl(invitationId) }
	})

export const fetchPublicInvitationPreview = createServerFn({ method: 'GET' })
	.inputValidator((data: { invitationId: string }) => data)
	.handler(async ({ data: { invitationId } }) => {
		const [row] = await db
			.select({
				id: invitation.id,
				email: invitation.email,
				status: invitation.status,
				expiresAt: invitation.expiresAt,
				organizationId: invitation.organizationId,
				inviterId: invitation.inviterId,
				organizationName: organization.name,
				inviterName: user.name,
				inviterEmail: user.email,
			})
			.from(invitation)
			.innerJoin(organization, eq(invitation.organizationId, organization.id))
			.innerJoin(user, eq(invitation.inviterId, user.id))
			.where(eq(invitation.id, invitationId))
			.limit(1)

		if (!row) {
			return { preview: null, error: 'not_found' as const }
		}

		if (row.status !== 'pending') {
			return { preview: null, error: 'not_pending' as const }
		}

		if (row.expiresAt < new Date()) {
			return { preview: null, error: 'expired' as const }
		}

		const [inviterMembership] = await db
			.select({ id: member.id })
			.from(member)
			.where(
				and(
					eq(member.userId, row.inviterId),
					eq(member.organizationId, row.organizationId),
				),
			)
			.limit(1)

		if (!inviterMembership) {
			return { preview: null, error: 'inviter_gone' as const }
		}

		return {
			preview: {
				id: row.id,
				email: row.email,
				organizationName: row.organizationName,
				inviterName: row.inviterName,
				inviterEmail: row.inviterEmail,
				expiresAt: row.expiresAt.toISOString(),
			} satisfies PublicInvitationPreview,
			error: null,
		}
	})
