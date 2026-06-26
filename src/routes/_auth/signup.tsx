import {
	IconExclamationCircle,
	IconEye,
	IconEyeClosed,
} from '@tabler/icons-react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { type FormEventHandler, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/_auth/signup')({
	validateSearch: (search) =>
		({
			redirect: (search.redirect as string) || '/onboarding',
		}) as { redirect?: string },
	beforeLoad: ({ context, search }) => {
		if (context.user) {
			throw redirect({ to: search.redirect })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { redirect: redirectTo } = Route.useSearch()
	const [showPassword, setShowPassword] = useState(false)
	const [formError, setFormError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		setFormError('')
		setIsSubmitting(true)

		const formData = new FormData(event.currentTarget)
		const jsonData = Object.fromEntries(formData.entries()) as {
			email: string
			password: string
			name?: string
		}

		try {
			const { error } = await authClient.signUp.email({
				email: jsonData.email,
				password: jsonData.password,
				name: jsonData.name?.trim() || jsonData.email.split('@')[0] || 'Subman user',
				callbackURL: redirectTo,
			})

			if (error) {
				setFormError(
					error.message ||
						'Something went wrong while creating your account. Please try again.',
				)
			}
		} catch (error) {
			console.error(error)
			setFormError('Something went wrong. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: redirectTo,
		})
	}

	return (
		<div className='mx-auto flex h-screen max-w-sm flex-col items-center justify-center p-4 lg:max-w-md lg:p-8'>
			<img alt='Subman logo' className='mb-2 size-16' src='/logo_light.svg' />
			<h1 className='mb-2 font-serif text-2xl lg:text-3xl'>
				Welcome to Subman
			</h1>
			<p className='mb-6 text-muted-foreground text-sm'>
				Already have an account?&nbsp;
				<Link
					className='underline'
					search={{ redirect: redirectTo }}
					to='/signin'
					viewTransition
				>
					Sign in
				</Link>
			</p>
			<form className='w-full space-y-4' onSubmit={handleSignUp}>
				{formError && (
					<Alert variant='error'>
						<IconExclamationCircle />
						<AlertTitle>We couldn&apos;t sign you up.</AlertTitle>
						<AlertDescription>{formError}</AlertDescription>
					</Alert>
				)}
				<div className='grid items-center gap-2'>
					<Label htmlFor='signup-name'>Name</Label>
					<Input id='signup-name' name='name' type='text' />
				</div>
				<div className='grid items-center gap-2'>
					<Label htmlFor='signup-email'>Email</Label>
					<Input id='signup-email' name='email' required type='email' />
				</div>
				<div className='grid items-center gap-2'>
					<Label htmlFor='signup-password'>Password</Label>
					<div className='flex items-center gap-2'>
						<Input
							id='signup-password'
							minLength={8}
							name='password'
							required
							type={showPassword ? 'text' : 'password'}
						/>
						<Button
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							onClick={() => setShowPassword((show) => !show)}
							size='icon'
							type='button'
							variant='outline'
						>
							{showPassword ? <IconEye /> : <IconEyeClosed />}
						</Button>
					</div>
				</div>
				<Button className='mt-2 w-full' disabled={isSubmitting} type='submit'>
					{isSubmitting && <Spinner className='size-4' />}
					Sign Up
				</Button>
			</form>
			<div className='my-4 flex w-full items-center justify-center gap-2'>
				<Separator className='flex-1' />
				<span className='text-muted-foreground'>Or</span>
				<Separator className='flex-1' />
			</div>
			<Button
				className='flex w-full items-center gap-2'
				onClick={handleGoogleLogin}
				size='lg'
				variant='outline'
			>
				<img alt='' className='size-6' src='/images/g.webp' />
				Sign in with Google
			</Button>
		</div>
	)
}
