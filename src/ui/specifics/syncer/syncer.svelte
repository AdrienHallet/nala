<script lang="ts">
	import ArrowUp from '$ui/icons/arrow-up.svelte';

	// When the syncer is actively listening
	let isActive = true;
	// When the syncer is processing changes
	let isProcessing = false;
	// When the syncer has no change to process
	let isFresh = true;

	function toggle() {
		console.log('hi!');
	}
</script>

<div
	class="flex w-6 cursor-pointer items-center justify-center rounded-sm border-zinc-600 hover:border"
	on:click={toggle}
	on:keypress={toggle}
>
	{#if isActive}
		{#if isProcessing}
			<div class="animate-bounce text-orange-600">
				<ArrowUp />
			</div>
		{:else if isFresh}
			<span class="h-2 w-2 rounded-full bg-green-600" />
		{:else}
			<span class="h-2 w-2 rounded-full bg-orange-600" />
		{/if}
	{:else}
		<span class="h-2 w-2 rounded-full bg-red-600 align-middle" />
	{/if}
</div>
