import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.search },
      })
    }
  },
  component: Authed,
})

function Authed() {
  return <Outlet />
}
