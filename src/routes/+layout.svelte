<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
<Nav />
<div class="p-8 font-serif">
	{@render children()}
</div>