export function AuthPageShell({ children }: { children: React.ReactNode }) {
	return (
		<div className='mx-auto flex h-screen w-full max-w-sm flex-col items-center justify-center p-4 lg:max-w-md lg:p-8'>
			{children}
		</div>
	)
}

export function AuthPageLogo() {
	return (
		<img
			alt='Subman logo'
			className='mb-2 size-16'
			src='/logo_light.svg'
		/>
	)
}
