<script lang="ts">
	import { transactions } from '$core/database/transaction/state.js';
	import { loading } from '$core/loading/state.js';
	import Button from '$ui/components/Button.svelte';
	import Loading from '$ui/components/loading.svelte';
	import VirtualScroll from '$ui/components/virtual-scroll.svelte';
	import { getCategories } from '$core/database/category/operations';
	import { addTransaction, getTransactions } from '$core/database/transaction/operations';
	import { Transaction } from '$core/model/database/transaction';
	import TransactionItem from './transaction-item.svelte';
	import { TRANSACTIONS_LAYOUT } from './constants.js';

	getTransactions();
	getCategories();

	function onAddClick() {
		addTransaction(new Transaction());
	}
</script>

{#if $loading.database || $loading.transactions || $loading.categories}
	<Loading />
{:else}
	<div class="w-full break-words rounded text-zinc-200">
		<div class="rounded-t border-0 px-4 py-2">
			<div class="flex flex-wrap items-center">
				<div class="relative w-full max-w-full flex-1 flex-grow px-4">
					<h3 class="text-lg font-semibold">Transactions ({$transactions?.length})</h3>
				</div>
				<div class="px-4">
					<Button on:click={onAddClick}>Add</Button>
				</div>
			</div>
		</div>
		<div class="h-[calc(100vh-116px)] overflow-x-auto px-2">
			<VirtualScroll items={$transactions} classes="min-w-[600px]">
				<div
					class="{TRANSACTIONS_LAYOUT} sticky top-0 auto-rows-auto overflow-hidden border border-x-0 bg-gradient-to-r from-zinc-800 to-stone-800"
					slot="header"
				>
					<div class="py-2 text-left">Date</div>
					<div class="py-2 text-left">Amount</div>
					<div class="py-2 text-left">Category</div>
					<div class="py-2 text-left">Title</div>
				</div>
				<TransactionItem slot="row" let:item transaction={item} />
			</VirtualScroll>
		</div>
	</div>
{/if}
