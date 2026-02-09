import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
// import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
// import { NotFound } from '@/components/NotFound'

export const Route = createFileRoute('/_auth')({
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
			{
				title: 'Subman | Know the True Value of Your Subscriptions',
			},
			{
				name: 'description',
				content: 'Maximizing value, not just minimizing cost.',
			},
		],
	}),
	// errorComponent: (props) => {
	// 	return <DefaultCatchBoundary {...props} />
	// },
	// notFoundComponent: () => <NotFound />,
	component: Public,
})

function Public() {
	return <Outlet />
}
