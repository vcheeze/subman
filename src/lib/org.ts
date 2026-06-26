export function personalOrgId(userId: string) {
	return `personal_${userId}`
}

export function personalMemberId(userId: string) {
	return `member_${userId}`
}

export function personalOrgName(name: string, email: string) {
	const display = name.trim() || email
	return `${display}'s Subman`
}

export function isPersonalOrgId(organizationId: string) {
	return organizationId.startsWith('personal_')
}

export function orgDisplayName(org: {
	id: string
	name: string
}) {
	if (isPersonalOrgId(org.id)) {
		return 'Just me'
	}

	return org.name
}

export function isHouseholdOrg(org: {
	id: string
	metadata?: string | null
}) {
	if (isPersonalOrgId(org.id)) {
		return false
	}

	if (!org.metadata) {
		return true
	}

	try {
		const parsed = JSON.parse(org.metadata) as { type?: string }
		return parsed.type === 'household'
	} catch {
		return true
	}
}

export function slugifyHouseholdName(name: string) {
	return (
		name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 40) || 'household'
	)
}

export function householdSlug(name: string) {
	const base = slugifyHouseholdName(name)
	const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 8)
	return `${base}-${suffix}`
}

export function resolveActiveOrganizationId(context: {
	user?: { id: string }
	activeOrganizationId?: string | null
}) {
	return (
		context.activeOrganizationId ??
		(context.user ? personalOrgId(context.user.id) : '')
	)
}

export function invitationAcceptPath(invitationId: string) {
	return `/accept-invite?invitationId=${encodeURIComponent(invitationId)}`
}

/** Client-safe URL builder; server code should use org-server.buildInvitationUrl. */
export function buildInvitationUrlClient(
	invitationId: string,
	baseUrl = typeof window !== 'undefined'
		? window.location.origin
		: 'http://localhost:3000',
) {
	return `${baseUrl.replace(/\/$/, '')}${invitationAcceptPath(invitationId)}`
}
