// lib/get-session.ts
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { db } from '~/db'
import { type Subscription, subscription } from '~/db/schema'
import { auth } from '~/utils/auth'
import { saveToLocalStorage } from '~/utils/localStorage'

export const createSubscriptions = createServerFn({
  method: 'POST',
})
  .validator((data: Subscription[]) => data)
  .handler(async ({ data }) => {
    // Get the web request which contains headers
    const request = getWebRequest()
    const { user } = await auth.api.getSession({
      headers: request.headers,
    })

    if (user) {
      return db.insert(subscription).values(data)
    }
    return saveToLocalStorage('subscriptions', data)
  })
