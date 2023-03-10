<script lang="ts">
	import { transactions } from '$core/database/transaction/state.js';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { getCategories } from '../../../core/database/category/operations';
	import { categories, categoryCountState } from '../../../core/database/category/state';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { categoryCountConfig } from './categories.config';

	let chart;
	let canvas;

	getTransactions();
	getCategories();

	onMount(async () => {
		chart = new Chart(canvas, categoryCountConfig($categoryCountState ?? []));
	});

	$: $transactions, $categories, $categoryCountState, updateChart();
	function updateChart() {
		if (!chart) {
			return;
		}
		chart.data.label = $categoryCountState.map((count) => count.category?.name);
		chart.data.datasets[0].data = $categoryCountState.map((count) => count.count);
		chart.update();
	}
</script>

<div class="flex max-h-full flex-col shadow-2xl">
	<span class="pl-4 text-lg font-semibold">Categories</span>
	<div class="relative h-full w-full">
		<canvas bind:this={canvas} class="absolute" />
	</div>
</div>
