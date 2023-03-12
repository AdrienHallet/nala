<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { getCategories } from '../../../core/database/category/operations';
	import { categoryCountState } from '../../../core/database/category/state';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { categoryCountConfig } from './categories.config';

	let chart;
	let canvas;

	getTransactions();
	getCategories();

	onMount(async () => {
		chart = new Chart(canvas, categoryCountConfig($categoryCountState ?? []));
	});

	$: $categoryCountState, updateChart();
	function updateChart() {
		if (!chart || $categoryCountState.length < 1) {
			return;
		}
		chart.destroy();
		chart = new Chart(canvas, categoryCountConfig($categoryCountState ?? []));
	}
</script>

<div class="flex max-h-full flex-col shadow-2xl">
	<span class="pl-4 text-lg font-semibold">Categories</span>
	<div class="relative h-full w-full">
		<canvas bind:this={canvas} class="absolute overflow-hidden" />
	</div>
</div>
