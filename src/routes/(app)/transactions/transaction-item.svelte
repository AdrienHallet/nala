<script lang="ts">
	import { categories } from '$core/database/category/state.js';
	import { updateTransaction } from '../../../core/database/transaction/operations';
	import { Transaction } from '../../../core/model/database/transaction';
	import { TRANSACTIONS_LAYOUT } from './constants.js';

	export let transaction: Transaction;
	let originalTransaction: Transaction | undefined = undefined;
	let amountDisplay = ((transaction.amount || 0) / 100).toFixed(2);

	$: transaction, onTransactionChange();

	function onTransactionChange() {
		if (!originalTransaction || originalTransaction.id != transaction.id) {
			// Render of the component with a new transaction (might be first or n time)
			originalTransaction = transaction;
			return;
		}
		transaction = Object.assign(new Transaction(), transaction);
		if (!transaction.equals(originalTransaction)) {
			// Transaction was updated and modified (sometimes update fired because of this bug: https://github.com/sveltejs/svelte/issues/5689)
			updateTransaction(transaction);
			originalTransaction = transaction;
		}
	}

	function onAmountInput() {
		transaction.amount = Math.round(parseFloat(amountDisplay || '0') * 100);
	}
</script>

<div class={TRANSACTIONS_LAYOUT}>
	<input type="date" class="ring-inset" bind:value={transaction.date} />
	<input class="hidden" bind:value={transaction.amount} step="any" type="number" />
	<input
		class="w-full bg-transparent text-right ring-inset"
		bind:value={amountDisplay}
		step="any"
		type="number"
		on:focusout={(event) =>
			(event.currentTarget.value = parseFloat(event.currentTarget.value || 0).toFixed(2))}
		on:input={onAmountInput}
	/>
	<select class="ring-inset" bind:value={transaction.categoryId}>
		<option value="" />
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>
	<input type="text" class="ring-inset" bind:value={transaction.title} />
</div>
