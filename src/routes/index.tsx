import { IconDroplet, IconEyeClosed, IconShieldLock } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { LandingChargesSection } from '@/components/landing-charges-section'
import { LandingProductPreview } from '@/components/landing-product-preview'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
	component: Home,
})

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
const HERO_STAGGER = 0.07
const TRUST_STAGGER = 0.06

const TRUST_ITEMS = [
	{
		icon: IconShieldLock,
		title: 'No bank connections',
		description:
			'You add subscriptions yourself. We never pull from your accounts.',
	},
	{
		icon: IconEyeClosed,
		title: 'Anonymized tracking',
		description:
			'Product analytics stay anonymous — your subscription list is yours.',
	},
	{
		icon: IconDroplet,
		title: 'Just you and your subs',
		description: 'No ads, no upsells. A clear picture of cost and value.',
	},
] as const

function fadeUpVariants(reduceMotion: boolean): Variants {
	if (reduceMotion) {
		return {
			hidden: { opacity: 1, y: 0 },
			visible: { opacity: 1, y: 0 },
		}
	}

	return {
		hidden: { opacity: 0, y: 12 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.42, ease: EASE_OUT_QUINT },
		},
	}
}

function staggerContainer(
	reduceMotion: boolean,
	stagger = HERO_STAGGER,
): Variants {
	if (reduceMotion) {
		return {
			hidden: {},
			visible: {},
		}
	}

	return {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: stagger,
				delayChildren: 0.04,
			},
		},
	}
}

function LandingNav({ reduceMotion }: { reduceMotion: boolean }) {
	return (
		<motion.nav
			animate={{ opacity: 1, y: 0 }}
			className='container mx-auto flex max-w-6xl items-center justify-between gap-4 px-2 py-4 lg:px-0 lg:py-6'
			initial={reduceMotion ? false : { opacity: 0, y: -8 }}
			transition={{
				duration: reduceMotion ? 0 : 0.35,
				ease: EASE_OUT_QUINT,
			}}
		>
			<Link
				aria-label='Subman home'
				className='flex items-center gap-2 text-foreground'
				to='/'
				viewTransition
			>
				<img alt='Subman logo' className='h-6' src='/logo_light.svg' />
				<span className='font-serif text-2xl'>Subman</span>
			</Link>
			<motion.div
				whileHover={reduceMotion ? undefined : { scale: 1.02 }}
				whileTap={reduceMotion ? undefined : { scale: 0.98 }}
			>
				<Button
					render={<Link to='/signin' viewTransition />}
					size='sm'
					variant='outline'
				>
					Sign in
				</Button>
			</motion.div>
		</motion.nav>
	)
}

function LandingCta({
	reduceMotion,
	className,
}: {
	reduceMotion: boolean
	className?: string
}) {
	return (
		<motion.div
			className={className}
			whileHover={reduceMotion ? undefined : { scale: 1.02 }}
			whileTap={reduceMotion ? undefined : { scale: 0.98 }}
		>
			<Button render={<Link to='/signup' viewTransition />} size='lg'>
				Start your audit
			</Button>
		</motion.div>
	)
}

function Home() {
	const reduceMotion = useReducedMotion() ?? false
	const heroItem = fadeUpVariants(reduceMotion)
	const trustItem = fadeUpVariants(reduceMotion)

	return (
		<div className='font-sans'>
			<LandingNav reduceMotion={reduceMotion} />

			<section className='px-2 pb-2 lg:px-4 lg:pb-4'>
				<div className='container mx-auto max-w-6xl rounded-xl bg-muted px-4 py-10 lg:px-10 lg:py-16'>
					<div className='grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-8'>
						<motion.div
							animate='visible'
							className='text-center lg:text-left'
							initial={reduceMotion ? false : 'hidden'}
							variants={staggerContainer(reduceMotion)}
						>
							<motion.h1
								className='mb-6 font-semibold font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-foreground leading-[1.1] text-balance tracking-[-0.02em]'
								variants={heroItem}
							>
								Know the true value of your subscriptions
							</motion.h1>
							<motion.p
								className='mx-auto mb-8 max-w-xl text-base text-foreground/80 leading-relaxed text-pretty lg:mx-0 lg:text-lg'
								variants={heroItem}
							>
								You don&apos;t need another budgeting app. You need to know
								what&apos;s worth your budget — and what you&apos;re happy to
								keep.
							</motion.p>
							<motion.div
								className='flex flex-col items-center gap-2 lg:items-start'
								variants={heroItem}
							>
								<LandingCta reduceMotion={reduceMotion} />
								<p className='text-muted-foreground text-xs'>
									Free to start. No bank login required.
								</p>
							</motion.div>
						</motion.div>
						<div className='flex justify-center lg:justify-end'>
							<LandingProductPreview reduceMotion={reduceMotion} />
						</div>
					</div>
				</div>
			</section>

			<LandingChargesSection reduceMotion={reduceMotion} />

			<section className='container mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20'>
				<motion.h2
					className='mb-10 font-semibold font-serif text-[clamp(1.875rem,4vw,2.5rem)] text-foreground leading-[1.15] text-balance tracking-[-0.02em]'
					initial={reduceMotion ? false : { opacity: 0, y: 10 }}
					transition={{
						duration: reduceMotion ? 0 : 0.4,
						ease: EASE_OUT_QUINT,
					}}
					viewport={{ once: true, margin: '-40px' }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
				>
					Your data stays yours
				</motion.h2>
				<motion.ul
					className='grid gap-8 sm:grid-cols-3'
					initial={reduceMotion ? false : 'hidden'}
					variants={staggerContainer(reduceMotion, TRUST_STAGGER)}
					viewport={{ once: true, amount: 0.25 }}
					whileInView={reduceMotion ? undefined : 'visible'}
				>
					{TRUST_ITEMS.map((item) => (
						<motion.li
							className='space-y-2'
							key={item.title}
							variants={trustItem}
						>
							<item.icon aria-hidden='true' className='size-7 text-primary' />
							<p className='font-medium text-foreground'>{item.title}</p>
							<p className='text-muted-foreground text-sm leading-relaxed text-pretty'>
								{item.description}
							</p>
						</motion.li>
					))}
				</motion.ul>
			</section>

			<footer className='mt-2 px-2 pb-2 lg:mt-4 lg:px-4 lg:pb-8'>
				<div className='container mx-auto flex max-w-6xl flex-col items-center rounded-xl bg-muted px-6 py-12 text-center lg:px-10 lg:py-16'>
					<h2 className='mb-6 font-semibold font-serif text-[clamp(1.875rem,4vw,3rem)] text-foreground leading-[1.15] text-balance tracking-[-0.02em]'>
						Reflect before you renew
					</h2>
					<p className='mb-8 max-w-lg text-foreground/80 text-pretty'>
						Not another expense tracker — a better relationship with what you
						pay for.
					</p>
					<LandingCta reduceMotion={reduceMotion} />
					<p className='mt-2 text-muted-foreground text-xs'>
						No spam, no noise — just{' '}
						<span className='text-foreground'>value</span>.
					</p>
					<nav
						aria-label='Footer'
						className='mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-muted-foreground text-xs'
					>
						<Link
							className='underline-offset-4 hover:text-foreground hover:underline'
							to='/privacy'
							viewTransition
						>
							Privacy
						</Link>
						<Link
							className='underline-offset-4 hover:text-foreground hover:underline'
							to='/terms'
							viewTransition
						>
							Terms
						</Link>
						<span aria-hidden='true'>·</span>
						<a
							className='underline-offset-4 hover:text-foreground hover:underline'
							href='https://vcheeze.pages.dev'
							rel='noopener'
							target='_blank'
						>
							Built by vcheeze
						</a>
					</nav>
				</div>
			</footer>
		</div>
	)
}
