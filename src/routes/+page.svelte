<script lang="ts">
	import { derived } from 'svelte/store';

	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Info from 'lucide-svelte/icons/info';
	import { groupBy } from 'rambda';
	import { MediaQuery } from 'runed';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Slider } from '$lib/components/ui/slider';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Frequency } from '$lib/constants';
	import storage from '$lib/store';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';

	interface Subscription {
		name: string;
		price: number;
		frequency: Frequency;
	}

	// export const auth = storage<Auth>("auth", { jwt: "" })

	const subscriptionStore = storage<Subscription[]>('subscriptionStore', []);

	const screen = new MediaQuery('(min-width: 640px)');

	const prices = derived(subscriptionStore, ($subscriptionStore) => {
		const groupedData = groupBy((d) => d.frequency, $subscriptionStore);
		const month =
			groupedData[Frequency.Monthly]?.reduce((acc, curr) => acc + curr.price, 0) ??
			0 + groupedData[Frequency.Annually]?.reduce((acc, curr) => acc + curr.price, 0) / 12 ??
			0;
		return {
			month,
			year: month * 12
		};
	});

	let years = [10];
	let percentage = [6];

	let subscriptionName = '';
	let subscriptionAmount = 0;
	let subscriptionFrequency: Frequency = Frequency.Monthly;
</script>

<div class="mb-4 flex scroll-m-20 justify-between border-b pb-2">
	<h2 class="text-3xl font-semibold tracking-tight transition-colors">Active Subscriptions</h2>
	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>
			<CirclePlus class={cn(screen.matches && 'mr-2', 'size-4')} />{screen.matches
				? 'Add Subscription'
				: ''}
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Add a new subscription</Drawer.Title>
				<Drawer.Description>Add a new subscription.</Drawer.Description>
			</Drawer.Header>
			<div class="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
				<div class="flex items-center space-x-2">
					<Label
						for="frequency"
						class={cn(subscriptionFrequency !== Frequency.Monthly && 'text-muted-foreground')}
						>Monthly</Label
					>
					<Switch
						id="frequency"
						checked={subscriptionFrequency === Frequency.Annually}
						onCheckedChange={() =>
							(subscriptionFrequency =
								subscriptionFrequency === Frequency.Annually
									? Frequency.Monthly
									: Frequency.Annually)}
					/>
					<Label
						for="frequency"
						class={cn(subscriptionFrequency !== Frequency.Annually && 'text-muted-foreground')}
						>
            Annually</Label
					>
				</div>
				<div></div>
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="subscriptionName">Name</Label>
					<Input
						type="text"
						id="subscriptionName"
						placeholder="Subscription name"
						bind:value={subscriptionName}
					/>
				</div>
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="subscriptionAmount">Price</Label>
					<Input
						type="number"
						id="subscriptionAmount"
						placeholder="0"
						bind:value={subscriptionAmount}
					/>
				</div>
			</div>
			<Drawer.Footer>
				<Button
					onclick={() => {
						subscriptionStore.update((current) => [
							...current,
							{
								name: subscriptionName,
								price: subscriptionAmount,
								frequency: subscriptionFrequency
							}
						]);
					}}>Submit</Button
				>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
	{#each $subscriptionStore as item}
		<Card.Root>
			<Card.Header>
				<Card.Title>{item.name}</Card.Title>
				<Card.Description>Billed {item.frequency}</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="leading-7 [&:not(:first-child)]:mt-6">{item.price.toFixed(2)} AED</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
<p class="leading-7 [&:not(:first-child)]:mt-6">
	You spend roughly <strong>{$prices.month.toFixed(2)} AED</strong> per month.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-6">
	That's about <strong>{$prices.year.toFixed(2)} AED</strong> per year, or
	<strong>{Math.round($prices.year / 20)} cups</strong>
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
	</sup>, or <strong>{Math.round($prices.year / 2.5)} cups</strong> of chai
	<sup>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
				<Tooltip.Content>
					<p>Assuming 2.5 AED per cup</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</sup>!
</p>
<p class="leading-7 [&:not(:first-child)]:mt-6">
	If you invested that amount in an ETF, you'd have <strong
		>{($prices.year * (1 + percentage[0] / 100) ** years[0]).toFixed(2)} AED</strong
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
	years assuming an return rate of <Popover.Root>
		<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>{percentage}</Popover.Trigger>
		<Popover.Content class="w-80">
			<div class="grid gap-4">
				<div class="space-y-2">
					<h4 class="font-medium leading-none">Return Rate</h4>
					<p class="text-sm text-muted-foreground">
						Drag to change the return rate. The S&P 500 has averaged an <a
							href="https://www.investopedia.com/ask/answers/042415/what-average-annual-return-sp-500.asp"
							class="font-semibold text-sky-800">annual return of 10.26% since 1957</a
						> (roughly 67 years ago).
					</p>
				</div>
				<Label>{percentage}</Label>
				<Slider min={1} max={20} step={1} bind:value={percentage} />
			</div>
		</Popover.Content>
	</Popover.Root>%.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-6">
	Doesn't seem like a lot? Try changing the numbers and see what happens. The power of compound
	interest is time, so increasing the number of years will, like, <em>literally</em> exponentially increase
	your return.
</p>
