import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnchoredToastProvider, ToastProvider } from '@/components/ui/toast'
import { getSession } from '@/lib/get-session'
// import Header from '../components/Header'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'

interface MyRouterContext {
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
	activeOrganizationId?: string | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		const session = await getSession()
		return {
			user: session?.user,
			activeOrganizationId: session?.session?.activeOrganizationId ?? null,
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
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
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
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body>
				{/* <Header /> */}
				<ThemeProvider defaultTheme='light'>
					<ToastProvider>
						<AnchoredToastProvider>
							<ScrollArea className='h-screen'>{children}</ScrollArea>
						</AnchoredToastProvider>
					</ToastProvider>
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
				{/* <Databuddy
          clientId={process.env.DATABUDDY_CLIENT_ID!}
          trackErrors={true}
          trackPerformance
          trackScreenViews // Default is false, explicitly enable for quick start
          trackWebVitals={true} // Default is false, explicitly enable for quick start
        /> */}
			</body>
		</html>
	)
}
