<script lang="ts">
	import { fade } from 'svelte/transition';
	
	import { DateFormatter } from '@internationalized/date';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Info from 'lucide-svelte/icons/info';
	import { groupBy } from 'rambda';
	import { MediaQuery } from 'runed';
	import type { Infer } from 'sveltekit-superforms';
	
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Slider } from '$lib/components/ui/slider';
	import * as Table from '$lib/components/ui/table';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Frequency } from '$lib/constants';
	import { localStore } from '$lib/localStore.svelte';
	import { cn, formatNumber } from '$lib/utils';

	import type { SubscriptionSchema } from './subs/schema';

	const subscriptions = localStore('subscriptions', [] as Infer<SubscriptionSchema>[]);
	const prices = $derived.by(() => {
		const groupedData = groupBy((d) => d.frequency, subscriptions.value);
		const month =
			(groupedData[Frequency.Monthly]?.reduce((acc, curr) => acc + curr.price, 0) ?? 0) +
			(groupedData[Frequency.Annually]?.reduce((acc, curr) => acc + curr.price, 0) ?? 0) / 12;
		return {
			month,
			year: month * 12
		};
	});
	const subsData = $derived.by(() =>
		subscriptions.value.map((sub) => ({
			...sub,
			nextPaymentDate: calculateNextPaymentDate({
				startDate: new Date(sub.subscribedOn),
				frequency: sub.frequency
			}),
			...(sub.rating && { cpScore: sub.price / sub.rating })
		}))
	);

	const screen = new MediaQuery('(min-width: 640px)');

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let years = $state([10]);
	let percentage = $state([6]);
	let alertDialogOpen = $state(false);

	let etfData = $derived.by(() => {
		const lumpSumResult = prices.year * (1 + percentage[0] / 100) ** years[0];
		const regularResult = calculateCompoundInterest({
			initialAmount: 0,
			yearlyContribution: prices.year,
			interestRate: percentage[0] / 100,
			years: years[0]
		});
		return {
			lumpSumResult,
			regularResult
		};
	});

	function calculateNextPaymentDate(subscription: { startDate: Date; frequency: Frequency }) {
		const { startDate, frequency } = subscription;
		const currentDate = new Date();

		let periodsPassed = 0;
		const nextPaymentDate = new Date(startDate);

		switch (frequency) {
			case Frequency.Monthly:
				periodsPassed =
					(currentDate.getFullYear() - startDate.getFullYear()) * 12 +
					currentDate.getMonth() -
					startDate.getMonth();
				nextPaymentDate.setMonth(startDate.getMonth() + periodsPassed + 1);
				break;

			case Frequency.Annually:
				periodsPassed = currentDate.getFullYear() - startDate.getFullYear();
				nextPaymentDate.setFullYear(startDate.getFullYear() + periodsPassed + 1);
				break;

			default:
				throw new Error('Invalid subscription frequency');
		}

		nextPaymentDate.setDate(startDate.getDate());

		return nextPaymentDate;
	}

	function calculateCompoundInterest({
		initialAmount,
		yearlyContribution,
		interestRate,
		years
	}: {
		initialAmount: number;
		yearlyContribution: number;
		interestRate: number;
		years: number;
	}): {
		totalContributions: number;
		finalBalance: number;
		totalInterestEarned: number;
	} {
		let balance = initialAmount;
		let totalContributions = initialAmount;

		// Calculate balance for each year
		for (let year = 1; year <= years; year++) {
			// Add yearly contribution
			balance += yearlyContribution;
			totalContributions += yearlyContribution;

			// Apply interest
			balance *= 1 + interestRate;
		}

		// Calculate total interest earned
		const totalInterestEarned = balance - totalContributions;

		return {
			totalContributions,
			finalBalance: Math.round(balance * 100) / 100,
			totalInterestEarned: Math.round(totalInterestEarned * 100) / 100
		};
	}
</script>

<div class="mb-4 flex scroll-m-20 justify-between border-b pb-2">
	<h2 class="text-3xl font-semibold tracking-tight transition-colors">Active Subscriptions</h2>
	<a href="/subs/new">
		<Button variant="outline" size={screen.matches ? 'default' : 'icon'}
			><CirclePlus class={cn('size-4', screen.matches && 'mr-2')} />{screen.matches
				? 'Add Subscription'
				: ''}</Button
		>
	</a>
</div>

{#if subscriptions.value.length === 0}
	<p class="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
		The most organized subscription list is an empty one.
	</p>
	<p class="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
		Don't add any subscriptions by clicking on the button at the top right corner.
	</p>
{:else}
	<h3 class="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">Upcoming Renewals</h3>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
		{#each subsData as item, index}
			<div transition:fade>
				<Card.Root>
					<Card.Header>
						<div class="flex justify-between">
							<Card.Title>{item.name}</Card.Title>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger
									class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), '-mr-3 -mt-3')}
									><EllipsisVertical class="size-4" /></DropdownMenu.Trigger
								>
								<DropdownMenu.Content class="font-sans">
									<DropdownMenu.Item
										onclick={() => {
											goto(`/subs/${item.id}`);
										}}>Edit</DropdownMenu.Item
									>
									<DropdownMenu.Item
										onclick={() => {
											alertDialogOpen = true;
										}}>Delete</DropdownMenu.Item
									>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
						<Card.Description>Billed {item.frequency}</Card.Description>
						<!-- <Card.Description
						>Next payment due on&nbsp;<span class="text-primary"
							>{df.format(new Date(item.subscribedOn))}</span
						></Card.Description
					> -->
					</Card.Header>
					<Card.Content class="font-sans">
						<Table.Root>
							<Table.Body>
								<Table.Row>
									<Table.Cell class="p-3 font-medium">Next payment due on</Table.Cell>
									<Table.Cell class="p-3">{df.format(item.nextPaymentDate)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell class="p-3 font-medium">Subscribed on</Table.Cell>
									<Table.Cell class="p-3">{df.format(new Date(item.subscribedOn))}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell class="p-3 font-medium">Costs</Table.Cell>
									<Table.Cell class="p-3">{formatNumber(item.price)} AED</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>
					</Card.Content>
				</Card.Root>
				<AlertDialog.Root bind:open={alertDialogOpen}>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
							<AlertDialog.Description>
								This action cannot be undone. This will permanently delete your subscription and
								remove your data from our servers.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action
								onclick={() => {
									alertDialogOpen = false;
									subscriptions.value = subscriptions.value.toSpliced(index);
								}}>Continue</AlertDialog.Action
							>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		{/each}
	</div>
{/if}

{#if prices.month && prices.year}
	<h2 class="mt-8 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
		Need some motivation to save?
	</h2>
	<div class="prose my-4" transition:fade>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			You spend roughly <strong>{formatNumber(prices.month)} AED</strong> per month.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			That's about <strong>{formatNumber(prices.year)} AED</strong> per year, or
			<strong>{Math.round(prices.year / 20)} cups</strong>
			of coffee
			<sup>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
						<Tooltip.Content>
							<p>Assuming 20 AED per cup</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</sup>, or <strong>{Math.round(prices.year / 2.5)} cups</strong> of chai
			<sup>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
						<Tooltip.Content>
							<p>Assuming 2.5 AED per cup</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</sup> (at least in Dubai)!
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			If you invested that amount in an ETF, you'd have <strong
				>{formatNumber(etfData.lumpSumResult)} AED</strong
			>
			after
			<Popover.Root>
				<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>{years}</Popover.Trigger>
				<Popover.Content class="w-80">
					<div class="grid gap-4">
						<div class="space-y-2">
							<h4 class="font-medium leading-none">Years</h4>
							<p class="text-sm text-muted-foreground">Drag to change the number of years.</p>
						</div>
						<Label>{years}</Label>
						<Slider min={5} max={50} step={5} bind:value={years} />
					</div>
				</Popover.Content>
			</Popover.Root>
			years assuming an annual return rate of <Popover.Root>
				<Popover.Trigger class={buttonVariants({ variant: 'outline' })}
					>{percentage}</Popover.Trigger
				>
				<Popover.Content class="w-80">
					<div class="grid gap-4">
						<div class="space-y-2">
							<h4 class="font-medium leading-none">Return Rate</h4>
							<p class="text-sm text-muted-foreground">
								Drag to change the return rate. The S&P 500 has averaged an <a
									href="https://www.investopedia.com/ask/answers/042415/what-average-annual-return-sp-500.asp"
									target="_blank"
									class="font-semibold text-sky-600 underline hover:text-sky-700 dark:text-sky-500 dark:hover:text-sky-400"
									>annual return of 10.26% since 1957</a
								> (roughly 67 years ago).
							</p>
						</div>
						<Label>{percentage}</Label>
						<Slider min={1} max={20} step={1} bind:value={percentage} />
					</div>
				</Popover.Content>
			</Popover.Root>%. To put this into perspective, it is {formatNumber(
				(prices.year * (1 + percentage[0] / 100) ** years[0]) / prices.year,
				1
			)} times what you spend on subscriptions each year.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			What's more, if you invested that amount yearly and not just as an initial lump sum, you'd
			have <strong>{formatNumber(etfData.regularResult.finalBalance)} AED</strong>, which is {formatNumber(
				etfData.regularResult.finalBalance / (prices.year * years[0]),
				1
			)} times what you would have spent on subscriptions ({formatNumber(
				etfData.regularResult.totalContributions
			)} AED), earning you an additional {etfData.regularResult.totalInterestEarned} AED.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Doesn't seem like a lot? Try changing the numbers and see what happens. The power of compound
			interest is time, so increasing the number of years will, like, <em>literally</em> exponentially
			increase your return.
		</p>
	</div>
{/if}
