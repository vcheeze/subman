import { IconArrowLeft, IconShoppingCartOff } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/privacy')({
	component: Privacy,
})

function Privacy() {
	return (
		<div className='container mx-auto mb-12 min-h-screen max-w-5xl text-base leading-relaxed'>
			<header className='sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur'>
				<div className=' flex h-16 items-center justify-between px-4'>
					<div className='flex items-center space-x-4'>
						<Button
							render={<Link className='flex items-center space-x-2' to='/' />}
							size='sm'
							variant='ghost'
						>
							<IconArrowLeft className='size-4' />
							<span>Back</span>
						</Button>
						<Separator className='h-6' orientation='vertical' />
						<div className='font-serif text-xl'>Subman</div>
					</div>
				</div>
			</header>

			<main className='mt-8'>
				<h1 className='mb-3 font-bold font-mono text-4xl'>Privacy Policy</h1>
				<p className='mb-3 text-muted-foreground'>
					Your privacy is central to how we build Subman. This policy explains
					what data we collect, why we collect it, and how you stay in control
					of your information.
				</p>
				<p className='text-muted-foreground text-xs'>
					Last updated: January 2025
				</p>

				<Separator className='my-8' />

				<section className='space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						1. Information We Collect
					</h2>
					<p>
						When you create an account, we collect your email address and
						encrypted password. Optional details — such as your name or timezone
						— help personalize your experience.
					</p>
					<p>
						When you add subscriptions, we store only the details you provide
						(like service name, billing frequency, and cost). Uploaded PDFs are
						processed automatically and permanently deleted within 24 hours of
						extraction.
					</p>
					<p>
						We also collect limited, anonymized analytics (e.g., page views and
						feature usage) to improve the product experience. This data cannot
						identify individual users.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						2. How We Use Your Information
					</h2>
					<ul className='list-disc space-y-2 pl-5'>
						<li>Operate and maintain your Subman account</li>
						<li>Provide subscription tracking, reminders, and insights</li>
						<li>Improve product performance and reliability</li>
						<li>
							Respond to support requests and send critical service updates
						</li>
					</ul>
					<Alert>
						<IconShoppingCartOff />
						<AlertTitle>
							We do not sell, rent, or share your personal data with advertisers
							or third parties for marketing purposes.
						</AlertTitle>
					</Alert>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						3. PDF Uploads and Data Processing
					</h2>
					<p>
						When you upload a PDF, Subman uses secure, encrypted processing
						powered by Amazon Textract. The file is temporarily stored to
						extract subscription details, then automatically and permanently
						deleted within 24 hours. Only the extracted information you confirm
						is saved to your account.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>4. Data Security</h2>
					<p>
						We use industry-standard security measures to protect your
						information:
					</p>
					<ul className='list-disc space-y-2 pl-5'>
						<li>256-bit AES encryption for stored data</li>
						<li>TLS 1.3 encryption for all network communications</li>
						<li>Optional two-factor authentication for enhanced security</li>
						<li>Regular security audits and access monitoring</li>
					</ul>
					<p>
						While no system can be 100% secure, we continuously review and
						improve our practices to safeguard your data.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						5. Data Retention
					</h2>
					<p>
						Your account data remains stored as long as your account is active.
						You can delete your account at any time, which removes all personal
						data and subscription records from our systems within 30 days.
					</p>
					<p>
						Backup copies used for disaster recovery are securely deleted within
						90 days of account removal.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						6. Your Rights and Control
					</h2>
					<p>You are always in control of your data. You can:</p>
					<ul className='list-disc space-y-2 pl-5'>
						<li>View or export your stored data</li>
						<li>Update or correct your personal details</li>
						<li>Delete your account and all related data</li>
						<li>Opt out of non-essential emails and analytics</li>
					</ul>
					<p>
						To exercise any of these rights, contact us at{' '}
						<a
							className='text-primary underline transition-opacity hover:text-primary/80'
							href='mailto:privacy@subman.app'
						>
							privacy@subman.app
						</a>
						.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						7. Third-Party Services
					</h2>
					<p>
						Subman uses trusted third-party providers for essential services
						like cloud storage, authentication, and analytics. These providers
						are carefully selected and comply with international data protection
						standards, including GDPR and CCPA where applicable.
					</p>
				</section>

				<section className='mt-10 space-y-6'>
					<h2 className='font-mono font-semibold text-2xl'>
						8. Policy Updates
					</h2>
					<p>
						We may occasionally update this Privacy Policy to reflect new
						features, legal requirements, or improvements in our practices.
						Significant changes will be announced through in-app notifications
						or email. Continued use of Subman after updates indicates your
						acceptance of the revised policy.
					</p>
				</section>

				<Separator className='my-8' />

				<footer className='text-center'>
					<p className='mb-6 text-muted-foreground'>
						Ready to manage your subscriptions with confidence and privacy?
					</p>
					<Button render={<Link to='/signup' />} size='lg'>
						Get Started with Subman
					</Button>
				</footer>
			</main>
		</div>
	)
}
