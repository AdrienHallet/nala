<script lang="ts">
	export let value;
	let displayed;

	const toValue = (x) => (value = Math.round(x * 100));
	const toDisplay = (x) => (displayed = (x / 100).toFixed(2));

	$: toDisplay(value);
	$: toValue(displayed);
</script>

<input class="hidden" bind:value step="any" type="number" />
<input
	class="w-full bg-transparent text-right ring-inset"
	bind:value={displayed}
	on:input
	on:blur={toDisplay(value)}
	step="any"
	type="number"
/>
