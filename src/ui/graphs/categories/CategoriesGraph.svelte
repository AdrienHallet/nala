<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { getCategories } from '../../../core/database/category/operations';
	import { categoryStatsState } from '../../../core/database/category/state';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { categoryStatGraphConfig } from './categories.config';
	import type { CategoryStatGraphOptions } from './categories.config';

	let chart;
	let canvas;
	let options = { type: 'total' } as CategoryStatGraphOptions;

	getTransactions();
	getCategories();

	onMount(async () => {
		chart = new Chart(canvas, categoryStatGraphConfig($categoryStatsState ?? [], options));
	});

	$: $categoryStatsState, updateChart();
	function updateChart() {
		if (!chart || $categoryStatsState.length < 1) {
			return;
		}
		chart.destroy();
		chart = new Chart(canvas, categoryStatGraphConfig($categoryStatsState ?? [], options));
	}
</script>

<div class="flex max-h-full flex-col shadow-2xl">
	<div class="relative h-full w-full">
		<canvas bind:this={canvas} class="absolute overflow-hidden" />
	</div>
</div>
