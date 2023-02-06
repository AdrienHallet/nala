<script lang="ts">
	import { configuration } from '$core/configuration/state';
	import { addTransaction, getTransactions } from '$core/database/transaction/operations.js';
	import { Transaction } from '$core/model/database/transaction.js';
	import { transactions } from '$core/database/transaction/state';
	configuration;
</script>

{#await getTransactions()}
	awaiting
{:then ignored}
	{$transactions.length}
	<button
		on:click={() => {
			console.log($transactions);
			addTransaction(new Transaction());
		}}>Dummy transaction</button
	>
{/await}
