<script lang="ts">
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';

	import { page } from '$app/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="flex items-center justify-between px-6 py-3">
	<h1 class="scroll-m-20 font-logo text-5xl tracking-tight lg:text-6xl">Subman</h1>
	<div class="flex gap-2">
		<ThemeSwitch />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}
				><EllipsisVertical class="size-4" /></DropdownMenu.Trigger
			>
			<DropdownMenu.Content align="end">
				{#if $page.url.pathname !== '/'}
					<DropdownMenu.Item><Button href="/">Go to app</Button></DropdownMenu.Item>
				{/if}
				<DropdownMenu.Item><a href="/about">About</a></DropdownMenu.Item>
				<!-- <DropdownMenu.Group>
				<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Billing</DropdownMenu.Item>
				<DropdownMenu.Item>Team</DropdownMenu.Item>
			</DropdownMenu.Group> -->
				<!-- <DropdownMenu.Separator /> -->
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
