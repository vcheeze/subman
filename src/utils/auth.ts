import { checkout, polar, portal, usage, webhooks } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { reactStartCookies } from 'better-auth/react-start'
import { db } from '~/db'
// biome-ignore lint/performance/noNamespaceImport: need all exports from schema
import * as schema from '~/db/schema'

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
})

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
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
    reactStartCookies(), // make sure this is the last plugin in the array
  ],
})
