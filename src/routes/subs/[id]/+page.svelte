<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Infer } from 'sveltekit-superforms';
	import SubscriptionForm from '../subscription-form.svelte';
	import type { PageData } from './$types';
	import type { SubscriptionSchema } from '../schema';
	import { localStore } from '$lib/localStore.svelte';
	import { redirect } from '@sveltejs/kit';

	let { data }: { data: PageData } = $props();

	const subscriptions = localStore('subscriptions', [] as Infer<SubscriptionSchema>[]);

	const subData = $derived.by(() => {
		return data.id ? subscriptions.value.find((sub) => sub.id === data.id) : {};
	});
</script>

<h3 class="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">Edit Subscription</h3>
<p class="mb-6 text-sm text-muted-foreground">
	Didn't get your details right the first time? Well, you're in the right place to set it right,
	right now.
</p>
<div class="font-sans">
	<SubscriptionForm
		data={subData || data.form}
		onSubmit={(formData) => {
			// non logged-in version saves only in local storage
			console.log('formData :>> ', formData);
			if (formData) {
				subscriptions.value = subscriptions.value.map((sub) => {
					if (sub.id === data.id) {
						return formData;
					}
					return sub;
				});
			}
			goto('/');
		}}
		onCancel={() => goto('/')}
	/>
</div>
