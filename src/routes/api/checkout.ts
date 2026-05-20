import { Checkout } from '@polar-sh/tanstack-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/checkout')({
	server: {
		handlers: {
			GET: Checkout({
				accessToken: process.env.POLAR_ACCESS_TOKEN,
				successUrl: process.env.SUCCESS_URL,
				server: 'sandbox', // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
				theme: 'light', // Enforces the theme - System-preferred theme will be set if left omitted
			}),
		},
	},
})
