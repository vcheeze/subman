// lib/get-session.ts
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { auth } from '~/utils/auth'

export const getSession = createServerFn({
  method: 'GET',
}).handler(async () => {
  // Get the web request which contains headers
  const request = getWebRequest()

  return await auth.api.getSession({
    headers: request.headers,
  })
})
