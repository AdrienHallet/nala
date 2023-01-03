<script lang="ts">
	export let disabled = false;
	export let loading = false;
	let activeColors = '';

	$: disabled, refreshStyle();

	const refreshStyle = () => {
		activeColors = 'bg-zinc-500 text-white ';
		if (disabled) {
			activeColors += 'opacity-75';
		} else {
			activeColors += 'hover:bg-zinc-700 active:bg-zinc-800';
		}
	};
</script>

<button
	on:click
	class="relative flex gap-3 rounded  py-2 px-4 font-bold {activeColors}"
	class:cursor-not-allowed={disabled}
	{disabled}
>
	<slot name="icon" />
	<slot />
	{#if loading}
		<div class="absolute bottom-0 right-0 w-full rounded-full bg-zinc-700">
			<div
				class="animate-[pingpong_2s_ease-in-out_infinite] rounded-full bg-zinc-500 p-0.5"
				style="width: 50%"
			/>
		</div>
	{/if}
</button>
