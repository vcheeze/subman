<script lang="ts">
	import { goto } from '$app/navigation';
	import { localStore } from '$lib/localStore.svelte';
	import type { Infer } from 'sveltekit-superforms';

	import SubscriptionForm from '../subscription-form.svelte';
	import type { PageData } from './$types';
	import type { SubscriptionSchema } from '../schema';

	let { data }: { data: PageData } = $props();

	const subscriptions = localStore('subscriptions', [] as Infer<SubscriptionSchema>[]);
</script>

<h3 class="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Add a New Subscription</h3>
<p class="mb-6 text-sm text-muted-foreground">
	Now what have you gone and done? Another subscription?
</p>
<div class="font-sans">
	<SubscriptionForm
		data={data.form}
		onSubmit={(formData) => {
			// non logged-in version saves only in local storage
			if (formData) {
				subscriptions.value = [...subscriptions.value, formData];
			}
			goto('/');
		}}
		onCancel={() => goto('/')}
	/>
</div>
