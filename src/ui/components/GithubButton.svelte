<script lang="ts">
	export let disabled = false;
	export let loading = false;
	export let lg = false;
	let dynamicClasses = '';

	$: disabled, refreshStyle();

	const refreshStyle = () => {
		dynamicClasses = ' ';
		if (disabled) {
			dynamicClasses += 'opacity-75';
		} else {
			dynamicClasses += 'hover:bg-zinc-700 active:bg-zinc-800';
		}
	};
</script>

<button
	on:click
	class="relative flex gap-3 rounded bg-zinc-500 px-4 font-bold text-white {dynamicClasses}"
	class:cursor-not-allowed={disabled}
	class:py-2={lg}
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
