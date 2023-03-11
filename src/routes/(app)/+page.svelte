<script lang="ts">
	import Balance from '$ui/graphs/balance/balance.svelte';
	import CategoriesGraph from '$ui/graphs/categories/categories-graph.svelte';
</script>

<div class="grid h-full min-h-[600px] grid-rows-2">
	<div class="grid grid-cols-2">
		<CategoriesGraph />
		<div>Three</div>
	</div>
	<Balance />
</div>
