/// <reference types="vite/client" />

import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type * as React from 'react'
// import { Toaster } from 'react-hot-toast'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { ThemeProvider } from '~/components/theme-provider'
import { ScrollArea } from '~/components/ui/scroll-area'
import { getSession } from '~/server/get-session'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user?: {
    id: string
    name: string
    emailVerified: boolean
    email: string
    createdAt: Date
    updatedAt: Date
    image?: string | null | undefined
    customerId?: string
  }
}>()({
  beforeLoad: async ({ context }) => {
    const session = await getSession()
    // TODO try this: https://x.com/dnlytras/status/1929961310411796624
    // const { user } = context.queryClient.ensureQueryData()
    return { user: session?.user }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Subman | Know the True Value of Your Subscriptions',
        description: 'Maximizing value, not just minimizing cost.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#FDFDFC' },
      { rel: 'icon', href: '/logo_dark.svg' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          <ScrollArea className="h-screen">{children}</ScrollArea>
        </ThemeProvider>
        {/* <Toaster /> */}
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
