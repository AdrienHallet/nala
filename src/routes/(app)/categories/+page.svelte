<script lang="ts">
	import { categories } from '$core/database/category/state.js';
	import VirtualScroll from '$ui/components/virtual-scroll.svelte';
	import CategoryItem from './category-item.svelte';
	import { addCategory, getCategories } from '../../../core/database/category/operations';
	import { Category } from '../../../core/model/database/category';
	import { CATEGORIES_LAYOUT } from './constants.js';

	getCategories();

	function onAddClick() {
		addCategory(new Category());
	}
</script>

<div class="w-full break-words rounded text-zinc-200">
	<div class="rounded-t border-0 px-4 py-3">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full max-w-full flex-1 flex-grow px-4">
				<h3 class="text-lg font-semibold">Categories ({$categories?.length})</h3>
			</div>
		</div>
	</div>
	<div class="h-[calc(100vh-116px)] overflow-x-auto px-2">
		<VirtualScroll items={$categories} classes="min-w-[500px]">
			<div
				class="{CATEGORIES_LAYOUT} sticky top-0 auto-rows-auto overflow-hidden border border-x-0 bg-gradient-to-r from-zinc-800 to-stone-800"
				slot="header"
			>
				<div class="py-2 text-left">Name</div>
				<div class="py-2 text-left">?</div>
				<div class="py-2 text-left">
					<button on:click={onAddClick} class="px-2">Add</button>
				</div>
			</div>
			<CategoryItem slot="row" let:item category={item} />
		</VirtualScroll>
	</div>
</div>
