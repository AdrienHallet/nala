<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { dailyState } from '../../../core/database/balance/state';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { balanceConfig } from './balance.config';

	let chart;
	getTransactions();
	onMount(async () => {
		const canvas = document.getElementsByTagName('canvas')[0];
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

<div class="h-[500px] w-full">
	<canvas />
</div>
