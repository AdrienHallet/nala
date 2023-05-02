<script lang="ts">
	import { categories } from '$core/database/category/state.js';
	import { deleteTransaction } from '$core/database/transaction/operations.js';
	import Trash from '$ui/icons/Trash.svelte';
	import { onMount } from 'svelte';
	import { updateTransaction } from '../../../core/database/transaction/operations';
	import { Transaction } from '../../../core/model/database/transaction';
	import { TRANSACTIONS_LAYOUT } from './constants.js';

	export let transaction: Transaction;
	let amountDisplay = ((transaction.amount || 0) / 100).toFixed(2);
	let component: Element;
	let focused = false;

	onMount(() => {
		component.addEventListener('focusin', () => (focused = true));
		component.addEventListener('focusout', () => (focused = false));
	});

	function onTransactionChange() {
		updateTransaction(transaction);
	}

	function onAmountInput() {
		transaction.amount = Math.round(parseFloat(amountDisplay || '0') * 100);
		onTransactionChange();
	}
</script>

<div bind:this={component} class={TRANSACTIONS_LAYOUT}>
	<input
		type="date"
		class="ring-inset"
		bind:value={transaction.date}
		on:input={onTransactionChange}
	/>
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
	<select class="ring-inset" bind:value={transaction.categoryId} on:input={onTransactionChange}>
		<option value="" />
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>
	<input
		type="text"
		class="ring-inset"
		bind:value={transaction.title}
		on:input={onTransactionChange}
	/>
	<div
		on:keyup={() => deleteTransaction(transaction)}
		on:click={() => deleteTransaction(transaction)}
		class="group w-full cursor-pointer px-3"
	>
		<div class="group-hover:bg-zinc-500">
			<Trash classes="h-6 mx-auto " />
		</div>
	</div>
</div>
