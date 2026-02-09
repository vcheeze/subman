import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toastManager } from '@/components/ui/toast'
import {
	subscriptionByIdQueryOptions,
	upsertSubscription,
} from '@/queries/subscriptions'

export const Route = createFileRoute('/_authed/subs/$subId')({
	component: RouteComponent,
})

const subscriptionSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	amount: z.string().min(1, 'Amount is required'),
	rating: z.coerce.number().min(1).max(5),
	notes: z.string().optional(),
})

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>

function RouteComponent() {
	const { subId } = Route.useParams()
	const navigate = Route.useNavigate()
	const userId = Route.useRouteContext({
		select: (context) => context.user?.id ?? '',
	})
	const { data, isLoading } = useQuery(
		subscriptionByIdQueryOptions(subId, userId),
	)

	const form = useForm({
		defaultValues: {
			name: data?.name ?? '',
			amount: data?.amount ?? '',
			rating: data?.rating ?? 1,
			notes: data?.notes ?? '',
		},
		validators: {
			onSubmit: subscriptionSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await upsertSubscription({ data: { values: value, userId, subId } })
				navigate({ to: '/app' })
			} catch {
				toastManager.add({
					title: 'Something went wrong',
					description: `${value.name} couldn't be added. Please try again.`,
					type: 'error',
				})
			}
		},
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='container mx-auto flex min-h-screen max-w-3xl flex-col justify-center p-4 lg:p-8'>
			<Card>
				<CardHeader>
					<CardTitle className='font-bold font-serif text-4xl'>
						{data?.name}
					</CardTitle>
					<CardDescription className='mb-6'>
						Something changed in your sub? Update it here.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-6'
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}
					>
						<form.Field name='name'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											What's it called?
										</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='e.g., Netflix, Spotify...'
											value={field.state.value}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						</form.Field>

						<form.Field name='amount'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											How much per month?
										</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='0.00'
											step='0.01'
											type='number'
											value={field.state.value}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						</form.Field>

						<form.Field name='rating'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											How much do you value it?
										</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											max='5'
											min='1'
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(Number(e.target.value))
											}
											placeholder='1-5'
											step='1'
											type='number'
											value={field.state.value}
										/>
										<FieldDescription className='text-xs'>
											Forget price. Think about how you feel.
											<br />5 = "I'd hate to live without it"
											<br />1 = "I wouldn't keep it even if it were free"
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						</form.Field>

						<form.Field name='notes'>
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Anything else? (Optional)
										</FieldLabel>
										<Textarea
											aria-invalid={isInvalid}
											className='resize-none'
											id={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder='Why you keep it, or what you use it for...'
											value={field.state.value}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						</form.Field>

						<div className='flex justify-end gap-2 max-sm:flex-col-reverse'>
							<Button
								render={<Link to='/app' viewTransition />}
								className='max-sm:w-full'
								variant='outline'
							>
								CANCEL
							</Button>
							<Button className='max-sm:w-full' type='submit'>
								UPDATE SUB
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
