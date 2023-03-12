<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { dailyState } from '../../../core/database/balance/state';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { balanceConfig } from './balance.config';

	let chart;
	let canvas;

	getTransactions();

	onMount(async () => {
		chart = new Chart(canvas, balanceConfig($dailyState));
	});

	$: $dailyState, updateChart();
	function updateChart() {
		if (!chart) {
			return;
		}
		chart.data.datasets[0].data = $dailyState;
		chart.update();
	}
</script>

<div class="flex max-h-full flex-col overflow-hidden shadow-2xl">
	<span class="pl-4 text-lg font-semibold">Balance</span>
	<div class="relative h-full w-full">
		<canvas bind:this={canvas} class="absolute" />
	</div>
</div>
