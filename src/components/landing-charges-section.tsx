import { motion, type Variants } from 'motion/react'

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const

const EXAMPLE_CHARGES = [
	{ name: 'Spotify', amount: '16.99' },
	{ name: 'ChatGPT', amount: '20.00' },
	{ name: 'Netflix', amount: '15.99' },
	{ name: 'Amazon Prime', amount: '14.99' },
] as const

const MONTHLY_TOTAL = 62.98

function rowVariants(reduceMotion: boolean): Variants {
	if (reduceMotion) {
		return {
			hidden: { opacity: 1, y: 0 },
			visible: { opacity: 1, y: 0 },
		}
	}

	return {
		hidden: { opacity: 0, y: 6 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.32, ease: EASE_OUT_QUINT },
		},
	}
}

export function LandingChargesSection({
	reduceMotion,
}: {
	reduceMotion: boolean
}) {
	const row = rowVariants(reduceMotion)

	return (
		<section className='container mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20'>
			<div className='grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16'>
				<div className='lg:pr-4'>
					<motion.h2
						className='font-semibold font-serif text-[clamp(1.875rem,4vw,2.5rem)] text-foreground leading-[1.15] text-balance tracking-[-0.02em]'
						initial={reduceMotion ? false : { opacity: 0, y: 10 }}
						transition={{
							duration: reduceMotion ? 0 : 0.4,
							ease: EASE_OUT_QUINT,
						}}
						viewport={{ once: true, margin: '-40px' }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					>
						Small charges add up — but cost isn&apos;t the whole story
					</motion.h2>
					<motion.p
						className='mt-8 font-serif text-[clamp(1.375rem,2.5vw,1.75rem)] text-foreground leading-snug text-pretty italic'
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						transition={{
							delay: reduceMotion ? 0 : 0.06,
							duration: reduceMotion ? 0 : 0.4,
							ease: EASE_OUT_QUINT,
						}}
						viewport={{ once: true, margin: '-40px' }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					>
						&ldquo;Eh, it&apos;s just $15.99.&rdquo;
					</motion.p>
				</div>

				<div className='space-y-6'>
					<motion.div
						className='border-border border-t'
						initial={reduceMotion ? false : 'hidden'}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: reduceMotion ? 0 : 0.05,
									delayChildren: reduceMotion ? 0 : 0.08,
								},
							},
						}}
						viewport={{ once: true, amount: 0.2 }}
						whileInView={reduceMotion ? undefined : 'visible'}
					>
						{EXAMPLE_CHARGES.map((charge) => (
							<motion.div
								className='flex items-baseline justify-between gap-4 border-border border-b py-3.5'
								key={charge.name}
								variants={row}
							>
								<span className='text-foreground text-sm'>{charge.name}</span>
								<span className='font-mono text-muted-foreground text-sm tabular-nums'>
									${charge.amount}
								</span>
							</motion.div>
						))}
						<motion.div
							className='flex items-baseline justify-between gap-4 py-4'
							variants={row}
						>
							<span className='font-medium text-foreground text-sm'>
								Monthly total
							</span>
							<span className='font-medium font-mono text-foreground text-lg tabular-nums'>
								${MONTHLY_TOTAL.toFixed(2)}
							</span>
						</motion.div>
					</motion.div>

					<motion.div
						className='space-y-4 text-base text-foreground/85 leading-relaxed text-pretty'
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						transition={{
							delay: reduceMotion ? 0 : 0.2,
							duration: reduceMotion ? 0 : 0.4,
							ease: EASE_OUT_QUINT,
						}}
						viewport={{ once: true, amount: 0.2 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					>
						<p>
							Four forgettable charges like these are real money — even when
							each one feels too small to notice.
						</p>
						<p>
							Subman shows what you pay and how much value you&apos;re getting
							back. Keep what you love on purpose. Skip what stopped earning its
							place — without the guilt trip.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
