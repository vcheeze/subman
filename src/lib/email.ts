type InvitationEmailParams = {
	to: string
	inviterName: string
	organizationName: string
	invitationUrl: string
}

export async function sendHouseholdInvitationEmail({
	to,
	inviterName,
	organizationName,
	invitationUrl,
}: InvitationEmailParams) {
	const apiKey = process.env.RESEND_API_KEY
	const from =
		process.env.RESEND_FROM_EMAIL ?? 'Subman <onboarding@resend.dev>'

	if (!apiKey) {
		console.info(
			`[subman] Household invitation for ${to} (${organizationName}): ${invitationUrl}`,
		)
		return
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from,
			to,
			subject: `${inviterName} invited you to ${organizationName} on Subman`,
			html: `
				<p>${inviterName} invited you to join <strong>${organizationName}</strong> on Subman — a shared place to track subscriptions and what they're worth.</p>
				<p><a href="${invitationUrl}">Accept invitation</a></p>
				<p>This link expires in 48 hours. If you didn't expect this, you can ignore this email.</p>
			`.trim(),
		}),
	})

	if (!response.ok) {
		const body = await response.text()
		throw new Error(`Failed to send invitation email: ${body}`)
	}
}
