import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authMiddleware } from '@/middleware/auth'

export const Route = createFileRoute('/_authed')({
	server: {
		middleware: [authMiddleware],
	},
	component: Authed,
})

function Authed() {
	return (
		<div className='font-mono'>
			<Outlet />
		</div>
	)
}
