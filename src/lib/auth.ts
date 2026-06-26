import { checkout, polar, portal, usage } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { organization } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '@/db'
import * as schema from '@/db/schema'
import { buildInvitationUrl, ensurePersonalOrganization } from '@/lib/org-server'
import { sendHouseholdInvitationEmail } from '@/lib/email'

const polarClient = new Polar({
	accessToken: process.env.POLAR_ACCESS_TOKEN,
})

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema,
	}),
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					await ensurePersonalOrganization(user)
				},
			},
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [
		organization({
			allowUserToCreateOrganization: true,
			invitationExpiresIn: 60 * 60 * 48,
			async sendInvitationEmail(data) {
				const invitationUrl = buildInvitationUrl(data.id)
				await sendHouseholdInvitationEmail({
					to: data.email,
					inviterName:
						data.inviter.user?.name ||
						data.inviter.user?.email ||
						'Someone',
					organizationName: data.organization.name,
					invitationUrl,
				})
			},
		}),
		polar({
			client: polarClient,
			createCustomerOnSignUp: false,
			use: [
				checkout({
					products: [
						{
							productId: 'e649cb4d-42b9-4854-a941-919c814adc6e',
							// productId: '6ef0a3df-2aa4-48db-aa51-e25e8e7ec369',
							slug: 'Subman', // Custom slug for easy reference in Checkout URL, e.g. /checkout/Subman
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL,
					authenticatedUsersOnly: true,
				}),
				portal(),
				usage(),
				// webhooks({
				//   secret: process.env.POLAR_WEBHOOK_SECRET,
				//   onCustomerStateChanged: (payload) => {}, // Triggered when anything regarding a customer changes
				//   onOrderPaid: (payload) => {}, // Triggered when an order was paid (purchase, subscription renewal, etc.)
				//   onPayload: (payload) => {}, // Catch-all for all events
				// }),
			],
		}),
		tanstackStartCookies(), // make sure this is the last plugin in the array
	],
	trustedOrigins: ['http://192.168.0.171:3000'],
})
