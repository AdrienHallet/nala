<script lang="ts">
	import { categories } from '$core/database/category/state.js';
	import { loading } from '$core/loading/state.js';
	import Button from '$ui/components/Button.svelte';
	import Loading from '$ui/components/loading.svelte';
	import VirtualScroll from '$ui/components/virtual-scroll.svelte';
	import CategoriesGraph from '$ui/graphs/categories/CategoriesGraph.svelte';
	import ChartPie from '$ui/icons/ChartPie.svelte';
	import CategoryItem from './category-item.svelte';
	import { addCategory, getCategories } from '../../../core/database/category/operations';
	import { Category } from '../../../core/model/database/category';
	import { CATEGORIES_LAYOUT } from './constants.js';

	getCategories();

	let isChartVisible = false;

	function onAddClick() {
		addCategory(new Category());
	}

	function setIsChartVisible(newState: boolean) {
		isChartVisible = newState;
	}
</script>

{#if $loading.database || $loading.categories}
	<Loading />
{:else}
	<div class="w-full break-words rounded text-zinc-200">
		<div class="rounded-t border-0 px-4 py-2">
			<div class="flex flex-wrap items-center">
				<div class="relative w-full max-w-full flex-1 flex-grow px-4">
					<h3 class="text-lg font-semibold">Categories ({$categories?.length})</h3>
				</div>
				<button class="border-0 bg-transparent" on:click={() => setIsChartVisible(!isChartVisible)}>
					<ChartPie
						slot="icon"
						classes="h-8 px-0.5 border-zinc-300 cursor-pointer text-zinc-300 inline-block rounded border-2 text-xs font-medium uppercase hover:border-zinc-200 hover:bg-zinc-300 hover:bg-opacity-10 active:border-zinc-400 active:bg-zinc-600"
					/>
				</button>
				<div class="px-4">
					<Button on:click={onAddClick}>Add</Button>
				</div>
			</div>
		</div>
		<div class="h-[calc(100vh-116px)] overflow-x-auto px-2">
			{#if isChartVisible}
				<CategoriesGraph />
			{:else}
				<VirtualScroll items={$categories} classes="min-w-[500px]">
					<div
						class="{CATEGORIES_LAYOUT} sticky top-0 auto-rows-auto overflow-hidden border border-x-0 bg-gradient-to-r from-zinc-800 to-stone-800"
						slot="header"
					>
						<div class="py-2 text-left">Name</div>
						<div class="py-2 text-left">Description</div>
					</div>
					<CategoryItem slot="row" let:item category={item} />
				</VirtualScroll>
			{/if}
		</div>
	</div>
{/if}
