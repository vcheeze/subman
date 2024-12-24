<script lang="ts">
	import {
		CalendarDate,
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import XIcon from 'lucide-svelte/icons/x';
	import { nanoid } from 'nanoid';
	import { MediaQuery } from 'runed';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { browser } from '$app/environment';
	import Rating from '$lib/components/Rating.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Frequency, ReminderUnit } from '$lib/constants';
	import { cn } from '$lib/utils';

	import { subscriptionSchema, type SubscriptionSchema } from './schema';

	let {
		data,
		onSubmit,
		onCancel,
	}: Pick<SuperValidated<Infer<SubscriptionSchema>>, 'data'> & {
		onSubmit?: (formData?: Infer<SubscriptionSchema>) => void;
		onCancel?: () => void;
	} = $props();

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(subscriptionSchema),
		onSubmit: () => {
			if ($formData && onSubmit) onSubmit($formData);
		},
	});

	const { form: formData, enhance } = form;

	const screen = new MediaQuery('(min-width: 640px)');
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let subscribedOn = $state<DateValue | undefined>();
	let showReminders = $state(false);

	$effect(() => {
		subscribedOn = $formData.subscribedOn ? parseDate($formData.subscribedOn) : undefined;
		if (!$formData.id) {
			$formData.id = nanoid(10);
		}
	});

	const addReminder = () => {
		$formData.reminders = [...($formData.reminders ?? []), { amount: 1, unit: ReminderUnit.Days }];
	};
	const removeReminder = (index: number) => () => {
		$formData.reminders = ($formData.reminders ?? []).toSpliced(index, 1);
	};
</script>

<form method="POST" use:enhance>
	<input type="hidden" name="id" bind:value={$formData.id} />
	<Form.Field {form} name="frequency">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Frequency</Form.Label>
				<div class="flex items-center space-x-2">
					<Label
						for="frequency"
						class={cn($formData.frequency !== Frequency.Monthly && 'text-muted-foreground')}
						>Monthly</Label
					>
					<Switch
						{...props}
						checked={$formData.frequency === Frequency.Annually}
						onCheckedChange={() =>
							($formData.frequency =
								$formData.frequency === Frequency.Annually
									? Frequency.Monthly
									: Frequency.Annually)}
					/>
					<Label
						for="frequency"
						class={cn($formData.frequency !== Frequency.Annually && 'text-muted-foreground')}
					>
						Annually</Label
					>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="grid gap-4 md:grid-cols-2">
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="price">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Price</Form.Label>
					<Input type="number" {...props} bind:value={$formData.price} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="subscribedOn">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Subscribed on</Form.Label>
					<Popover.Root>
						<Popover.Trigger>
							{#snippet child({ props })}
								<Button
									variant="outline"
									class={cn(
										'w-full justify-start text-left font-normal',
										!subscribedOn && 'text-muted-foreground'
									)}
									{...props}
								>
									<CalendarIcon class="mr-2 size-4" />
									{subscribedOn
										? df.format(subscribedOn.toDate(getLocalTimeZone()))
										: 'Select a date'}
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar
								value={subscribedOn as DateValue}
								minValue={new CalendarDate(1980, 1, 1)}
								maxValue={today(getLocalTimeZone())}
								type="single"
								initialFocus
								onValueChange={(v) => {
									if (v) {
										$formData.subscribedOn = v.toString();
									} else {
										$formData.subscribedOn = '';
									}
								}}
							/>
						</Popover.Content>
					</Popover.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="rating">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Rating (Optional)</Form.Label>
					<!-- <Input type="number" {...props} bind:value={$formData.rating} /> -->
					<Rating
						{...props}
						value={$formData.rating}
						onValueChange={(value: number) => ($formData.rating = value)}
					/>
				{/snippet}
			</Form.Control>
		</Form.Field>
		<div class="flex items-center space-x-2">
			<Checkbox
				id="showReminders"
				bind:checked={showReminders}
				aria-labelledby="showReminders-label"
			/>
			<Label
				id="showReminders-label"
				for="showReminders"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Remind me before the next payment
			</Label>
		</div>
	</div>

	{#if showReminders}
		<Separator class="my-4" />
		<Form.Fieldset {form} name="reminders">
			<Form.Legend>Reminders</Form.Legend>
			<Form.Description
				>Tell me when you want to be nagged about your subscription.</Form.Description
			>
			{#each $formData.reminders as reminder, index}
				<div class="flex space-x-3">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} type="number" min={1} bind:value={reminder.amount} />
						{/snippet}
					</Form.Control>
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" name={props.name} bind:value={reminder.unit}>
								<Select.Trigger>{reminder.unit ?? ''}</Select.Trigger>
								<Select.Content>
									{#each [ReminderUnit.Minutes, ReminderUnit.Hours, ReminderUnit.Days, ReminderUnit.Weeks] as unit}
										<Select.Item value={unit}>{unit}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Button variant="secondary" onclick={removeReminder(index)}
						><XIcon class="size-4" /></Button
					>
				</div>
			{/each}
			<Button variant="secondary" onclick={addReminder}>Add reminder</Button>
		</Form.Fieldset>
	{/if}

	<div class={cn('mt-6 flex gap-2', screen.matches && 'flex flex-row')}>
		<Form.Button>Submit</Form.Button>
		<Button variant="outline" onclick={() => onCancel && onCancel()}>Cancel</Button>
	</div>
	{#if browser}
		<div class="mt-4">
			<SuperDebug data={$formData} />
		</div>
	{/if}
</form>
