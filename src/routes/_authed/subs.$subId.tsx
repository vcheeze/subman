import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/subs/$subId')({
	component: Outlet,
})
