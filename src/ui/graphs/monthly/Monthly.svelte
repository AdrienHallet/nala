<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { monthlyConfig } from './monthly.config';

	let chart;
	let canvas;

	export let monthlies = [];

	onMount(async () => {
		chart = new Chart(canvas, monthlyConfig(monthlies));
	});

	$: monthlies, updateChart();
	function updateChart() {
		if (!chart) {
			return;
		}
		chart.data.datasets[0].data = monthlies;
		chart.update();
	}
</script>

<div class="flex h-full max-h-full flex-col overflow-hidden shadow-2xl">
	<span class="pl-4 text-lg font-semibold">Monthly</span>
	<div class="relative h-full w-full">
		<canvas bind:this={canvas} class="absolute" />
	</div>
</div>
