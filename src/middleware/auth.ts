import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'

import { session as sessionTable } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/lib/auth'
import { ensurePersonalOrganization } from '@/lib/org-server'
import { personalOrgId } from '@/lib/org'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const headers = getRequestHeaders()
	const session = await auth.api.getSession({ headers })

	if (!session) {
		throw redirect({ to: '/signin' })
	}

	await ensurePersonalOrganization(session.user)

	if (!session.session.activeOrganizationId) {
		const activeOrganizationId = personalOrgId(session.user.id)
		await db
			.update(sessionTable)
			.set({ activeOrganizationId })
			.where(eq(sessionTable.id, session.session.id))
	}

	return await next()
})
