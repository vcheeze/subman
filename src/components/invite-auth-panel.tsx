import {
	IconExclamationCircle,
	IconEye,
	IconEyeClosed,
} from '@tabler/icons-react'
import { type FormEventHandler, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/lib/auth-client'

type InviteAuthPanelProps = {
	email: string
	redirectTo: string
}

type AuthMode = 'sign-in' | 'sign-up'

export function InviteAuthPanel({ email, redirectTo }: InviteAuthPanelProps) {
	const [mode, setMode] = useState<AuthMode>('sign-in')
	const [showPassword, setShowPassword] = useState(false)
	const [formError, setFormError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		setFormError('')
		setIsSubmitting(true)

		const formData = new FormData(event.currentTarget)
		const password = formData.get('password') as string

		try {
			if (mode === 'sign-in') {
				const { error } = await authClient.signIn.email({
					email,
					password,
					callbackURL: redirectTo,
				})

				if (error) {
					setFormError(
						error.message ||
							'Could not sign you in. Check your password and try again.',
					)
				}
				return
			}

			const name = (formData.get('name') as string).trim()
			const { error } = await authClient.signUp.email({
				email,
				password,
				name: name || email.split('@')[0] || 'Subman user',
				callbackURL: redirectTo,
			})

			if (error) {
				setFormError(
					error.message ||
						'Could not create your account. You may already have one — try signing in.',
				)
			}
		} catch {
			setFormError('Something went wrong. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleGoogleSignIn = async () => {
		setFormError('')
		setIsGoogleLoading(true)
		try {
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: redirectTo,
			})
		} catch {
			setFormError('Google sign-in did not start. Please try again.')
			setIsGoogleLoading(false)
		}
	}

	const switchMode = (nextMode: AuthMode) => {
		setMode(nextMode)
		setFormError('')
	}

	return (
		<div className='flex w-full flex-col'>
			<p className='mb-6 text-center text-muted-foreground text-sm'>
				{mode === 'sign-in' ? (
					<>
						New here?{' '}
						<button
							className='rounded-sm text-foreground underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
							onClick={() => switchMode('sign-up')}
							type='button'
						>
							Create account
						</button>
					</>
				) : (
					<>
						Already have an account?{' '}
						<button
							className='rounded-sm text-foreground underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
							onClick={() => switchMode('sign-in')}
							type='button'
						>
							Sign in
						</button>
					</>
				)}
			</p>

			{formError && (
				<Alert className='mb-4' variant='error'>
					<IconExclamationCircle />
					<AlertTitle>We couldn&apos;t sign you in.</AlertTitle>
					<AlertDescription>{formError}</AlertDescription>
				</Alert>
			)}

			<form className='w-full space-y-4' key={mode} onSubmit={handleSubmit}>
				{mode === 'sign-up' && (
					<div className='grid items-center gap-2'>
						<Label htmlFor='invite-auth-name'>Your name</Label>
						<Input
							autoComplete='name'
							id='invite-auth-name'
							name='name'
							placeholder='Alex'
						/>
					</div>
				)}

				<div className='grid items-center gap-2'>
					<Label htmlFor='invite-auth-password'>Password</Label>
					<div className='flex items-center gap-2'>
						<Input
							autoComplete={
								mode === 'sign-in' ? 'current-password' : 'new-password'
							}
							autoFocus
							className='flex-1'
							id='invite-auth-password'
							minLength={mode === 'sign-up' ? 8 : undefined}
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

				<Button
					className='mt-2 w-full'
					disabled={isSubmitting || isGoogleLoading}
					size='lg'
					type='submit'
				>
					{isSubmitting && <Spinner className='size-4' />}
					{mode === 'sign-in' ? 'Sign in to accept' : 'Create account & accept'}
				</Button>
			</form>

			<div className='my-4 flex w-full items-center justify-center gap-2'>
				<Separator className='flex-1' />
				<span className='text-muted-foreground'>Or</span>
				<Separator className='flex-1' />
			</div>

			<Button
				className='flex w-full items-center gap-2'
				disabled={isGoogleLoading || isSubmitting}
				onClick={handleGoogleSignIn}
				size='lg'
				variant='outline'
			>
				{isGoogleLoading ? (
					<Spinner className='size-4' />
				) : (
					<img alt='Google G' className='size-6' src='/images/g.webp' />
				)}
				Continue with Google
			</Button>
		</div>
	)
}
