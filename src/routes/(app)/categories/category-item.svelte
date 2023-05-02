<script lang="ts">
	import { updateCategory } from '../../../core/database/category/operations';
	import { Category } from '../../../core/model/database/category';
	import { CATEGORIES_LAYOUT } from './constants.js';

	export let category: Category;

	function onCategoryChange() {
		updateCategory(category);
	}
</script>

<div class={CATEGORIES_LAYOUT}>
	<input type="text" class="ring-inset" bind:value={category.name} on:input={onCategoryChange} />
	<input
		type="text"
		class="ring-inset"
		bind:value={category.description}
		on:input={onCategoryChange}
	/>
</div>
