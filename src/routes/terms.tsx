import { IconArrowLeft, IconFileDescription } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/terms')({
	component: Terms,
})

function Terms() {
	return (
		<div className='min-h-screen text-base leading-relaxed'>
			{/* Header */}
			<header className='sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur'>
				<div className='container mx-auto flex h-16 max-w-5xl items-center justify-between px-4'>
					<div className='flex items-center space-x-4'>
						<Button
							render={<Link className='flex items-center space-x-2' to='/' />}
							size='sm'
							variant='ghost'
						>
							<IconArrowLeft className='h-4 w-4' />
							<span>Back</span>
						</Button>
						<Separator className='h-6' orientation='vertical' />
						<div className='flex items-center space-x-2'>
							<IconFileDescription className='h-5 w-5 text-blue-600' />
							<span className='font-semibold text-xl tracking-tight'>
								Subman
							</span>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='container mx-auto max-w-3xl px-4 py-12'>
				<h1 className='mb-3 font-bold text-4xl'>Terms of Service</h1>
				<p className='mb-8 text-muted-foreground'>
					Welcome to Subman. By using our app, you agree to the following terms.
					Please read them carefully before using our services.
				</p>
				<p className='mb-12 text-muted-foreground text-sm'>
					Last updated: June 19, 2025
				</p>

				{/* 1. Using Subman */}
				<section className='space-y-6'>
					<h2 className='font-semibold text-2xl'>1. Using Subman</h2>
					<div className='space-y-4'>
						<div>
							<h3 className='font-semibold'>Eligibility</h3>
							<p>
								You must be at least 13 years old to use Subman. If you are
								under 18, you must have consent from a parent or guardian.
							</p>
						</div>
						<div>
							<h3 className='font-semibold'>Account Security</h3>
							<p>
								You are responsible for maintaining the security of your
								account. Do not share your login credentials with anyone, and
								notify us immediately if you suspect unauthorized access.
							</p>
						</div>
						<div>
							<h3 className='font-semibold'>User Responsibilities</h3>
							<ul className='list-disc space-y-1 pl-5'>
								<li>Provide accurate and up-to-date subscription details</li>
								<li>Review parsed data from uploaded PDFs before saving</li>
								<li>Use Subman for personal, non-commercial purposes only</li>
							</ul>
						</div>
						<div>
							<h3 className='font-semibold'>Prohibited Actions</h3>
							<ul className='list-disc space-y-1 pl-5 text-red-700'>
								<li>Attempting to hack, reverse-engineer, or misuse Subman</li>
								<li>
									Uploading harmful files or violating any applicable laws
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* 2. Freemium Model */}
				<section className='mt-10 space-y-6'>
					<h2 className='font-semibold text-2xl'>2. Freemium Model</h2>
					<p>
						Subman operates under a freemium model. You can use our free tier
						indefinitely, or choose to upgrade for premium features.
					</p>
					<div className='grid gap-6 md:grid-cols-2'>
						<div>
							<h3 className='font-semibold text-green-800'>Free Tier</h3>
							<ul className='list-disc space-y-1 pl-5 text-sm'>
								<li>Unlimited subscription tracking</li>
								<li>Payment reminders</li>
								<li>3 PDF parses per month</li>
								<li>Basic insights</li>
							</ul>
						</div>
						<div>
							<h3 className='font-semibold text-blue-800'>Premium Tier</h3>
							<p className='mb-1 text-sm'>$3.99/month or $39.99/year</p>
							<ul className='list-disc space-y-1 pl-5 text-sm'>
								<li>Unlimited PDF parsing</li>
								<li>Advanced analytics and insights</li>
								<li>Multi-device sync</li>
								<li>CSV/PDF export options</li>
							</ul>
						</div>
					</div>
					<p className='mt-2 text-amber-800 text-sm'>
						<strong>Note:</strong> Premium subscriptions are non-refundable, but
						you may cancel anytime to prevent future charges.
					</p>
				</section>

				{/* 3. Your Content */}
				<section className='mt-10 space-y-6'>
					<h2 className='font-semibold text-2xl'>3. Your Content</h2>
					<p>
						You retain full ownership of the data you enter or confirm within
						Subman. By using the service, you grant Subman a limited license to
						process and store this information solely for providing app
						functionality.
					</p>
					<p>
						You are responsible for the accuracy and legality of the content you
						upload or generate within the app.
					</p>
				</section>

				{/* 4. Termination */}
				<section className='mt-10 space-y-6'>
					<h2 className='font-semibold text-2xl'>4. Termination</h2>
					<p>
						You may delete your account at any time within the app. Upon
						deletion, your account and associated data will be permanently
						removed within 30 days.
					</p>
					<p>
						We reserve the right to suspend or terminate accounts that violate
						these terms or engage in fraudulent or harmful activity.
					</p>
				</section>

				{/* 5. Disclaimers and Liability */}
				<section className='mt-10 space-y-6'>
					<h2 className='font-semibold text-2xl'>
						5. Disclaimers and Limitation of Liability
					</h2>
					<p>
						Subman is provided “as is,” without warranties of any kind, express
						or implied. While we aim for accuracy and reliability, we cannot
						guarantee that all parsed or displayed information is error-free.
					</p>
					<p>
						Subman is not responsible for financial decisions, losses, or
						damages resulting from the use or inability to use the service.
					</p>
				</section>

				{/* 6. Changes to These Terms */}
				<section className='mt-10 space-y-6'>
					<h2 className='font-semibold text-2xl'>6. Changes to These Terms</h2>
					<p>
						We may update these Terms of Service periodically to reflect
						improvements or legal requirements. Any significant changes will be
						communicated via in-app notifications or email. Continued use of
						Subman indicates acceptance of the updated terms.
					</p>
				</section>

				{/* 7. Contact */}
				<section className='mt-10 space-y-6 border-border border-t pt-10 text-center'>
					<h2 className='font-semibold text-2xl'>7. Contact</h2>
					<p className='text-muted-foreground'>
						If you have any questions about these terms, reach us at{' '}
						<a
							className='text-blue-600 underline hover:text-blue-700'
							href='mailto:support@subman.app'
						>
							support@subman.app
						</a>
						.
					</p>
				</section>
			</main>
		</div>
	)
}
