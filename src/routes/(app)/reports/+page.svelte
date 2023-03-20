<script lang="ts">
	import { monthlyState } from '$core/database/balance/state.js';
	import { loading } from '$core/loading/state.js';
	import VirtualScroll from '$ui/components/virtual-scroll.svelte';
	import Loading from '$ui/components/loading.svelte';
	import { getCategories } from '../../../core/database/category/operations';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { MONTHLY_LAYOUT } from './constants.js';
	import MonthlyItem from './MonthlyItem.svelte';

	getTransactions();
	getCategories();
</script>

{#if $loading.database || $loading.transactions || $loading.categories}
	<Loading />
{:else}
	<div class="h-[calc(100vh-66px)] w-full min-w-[400px] max-w-[450px] overflow-x-auto">
		<VirtualScroll items={$monthlyState}>
			<div
				class="{MONTHLY_LAYOUT} sticky top-0 auto-rows-auto overflow-hidden border border-x-0 bg-gradient-to-r from-zinc-800 to-stone-800"
				slot="header"
			>
				<div class="py-2 text-left">Month</div>
				<div class="py-2 text-right">Incomes</div>
				<div class="py-2 text-right">Expenses</div>
				<div class="py-2 text-right">Spared</div>
			</div>
			<MonthlyItem slot="row" let:item monthly={item} />
		</VirtualScroll>
	</div>
{/if}
