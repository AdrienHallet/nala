<script lang="ts">
	import { monthlyState } from '$core/database/balance/state.js';
	import { categories } from '$core/database/category/state';
	import { loading } from '$core/loading/state.js';
	import VirtualScroll from '$ui/components/virtual-scroll.svelte';
	import Loading from '$ui/components/loading.svelte';
	import Monthly from '$ui/graphs/monthly/Monthly.svelte';
	import { dailyState } from '../../../core/database/balance/state';
	import { getCategories } from '../../../core/database/category/operations';
	import { getTransactions } from '../../../core/database/transaction/operations';
	import { MONTHLY_LAYOUT } from './constants.js';
	import MonthlyItem from './MonthlyItem.svelte';

	getTransactions();
	getCategories();

	$dailyState;
</script>

{#if $loading.database || $loading.transactions || $loading.categories}
	<Loading />
{:else}
	<div class="flex flex-row">
		<div class="w-full break-words rounded text-zinc-200">
			<div class="rounded-t border-0 px-4 py-3">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full max-w-full flex-1 flex-grow px-4">
						<h3 class="text-lg font-semibold">Reports</h3>
					</div>
				</div>
			</div>
			<div class="h-[calc(100vh-116px)] overflow-x-auto px-2">
				<VirtualScroll items={$monthlyState} classes="">
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
		</div>
	</div>
{/if}
