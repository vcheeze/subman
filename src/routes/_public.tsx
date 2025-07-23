import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/_public')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/app',
      })
    }
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
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description:
          'TanStack Start is a type-safe, client-first, full-stack React framework. ',
      }),
    ],
  }),
  errorComponent: (props) => {
    return <DefaultCatchBoundary {...props} />
  },
  notFoundComponent: () => <NotFound />,
  component: Public,
})

function Public() {
  return <Outlet />
}
