<script lang="ts">
	import { cn } from '$lib/utils';
	import Star from 'lucide-svelte/icons/star';

	let { value = 0, onValueChange } = $props();
	let rating = $state(value);
	let hovered = $state(value);
</script>

<div class="flex h-10 items-center gap-2" onmouseleave={() => (hovered = rating)} role="group">
	{#each Array(5) as _, index}
		<Star
			class={cn(
				'hover:cursor-pointer',
				index + 1 <= hovered && 'fill-yellow-300 stroke-yellow-300',
				index + 1 <= rating && 'fill-yellow-400 stroke-yellow-400'
			)}
			onmouseenter={() => (hovered = index + 1)}
			onclick={() => {
				const newValue = index + 1;
				rating = newValue;
				if (onValueChange) {
					onValueChange(newValue);
				}
			}}
		/>
	{/each}
</div>
