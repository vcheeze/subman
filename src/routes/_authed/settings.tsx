import { createFileRoute, Link } from '@tanstack/react-router'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_authed/settings')({
	component: Settings,
})

function Settings() {
	return (
		<div className='container mx-auto p-4 lg:p-8'>
			<Breadcrumb className='mb-8'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink render={<Link to='/app' viewTransition />}>
							app
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>settings</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className='font-medium text-3xl lg:text-4xl'>Settings</h1>
			<Separator className='my-4 lg:my-8' />
			<div className='space-y-4'>
				<Field>
					<FieldLabel>Currency</FieldLabel>
					<FieldDescription>
						Enter the currency symbol you want to use.
					</FieldDescription>
					<Input className='max-w-sm' placeholder='USD' />
				</Field>
			</div>
		</div>
	)
}
