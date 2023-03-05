<script lang="ts">
	import { updateCategory } from '../../../core/database/category/operations';
	import { Category } from '../../../core/model/database/category';
	import { CATEGORIES_LAYOUT } from './constants.js';

	export let category: Category;
	let originalCategory: Category | undefined = undefined;

	$: category, onCateogryChange();

	function onCateogryChange() {
		if (!originalCategory || originalCategory.id != category.id) {
			// Render of the component with a new category (might be first or n time)
			originalCategory = category;
			return;
		}
		category = Object.assign(new Category(), category);
		if (!category.equals(originalCategory)) {
			// Category was updated and modified (sometimes update fired because of this bug: https://github.com/sveltejs/svelte/issues/5689)
			updateCategory(category);
			originalCategory = category;
		}
	}
</script>

<div class={CATEGORIES_LAYOUT}>
	<input type="text" class="ring-inset" bind:value={category.name} />
	<input type="text" class="ring-inset" bind:value={category.name} />
</div>
