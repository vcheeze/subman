import { CustomerPortal } from '@polar-sh/tanstack-start'
import { createServerFileRoute, getSession } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/portal').methods({
  GET: CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    getCustomerId: async (request: Request) => {
      return ''
      // const session = await getSession({
      //   password: process.env.SESSION_SECRET,
      //   name: 'app-session',
      // })
      // return session.data.customerId;
    }, // Function to resolve a Polar Customer ID
    server: 'sandbox', // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  }),
})
