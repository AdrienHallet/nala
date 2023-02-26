<script lang="ts">
	import { Transaction } from '../../../core/model/database/transaction';
	import { TRANSACTIONS_LAYOUT } from './constants.js';

	export let transaction: Transaction;
</script>

<div class={TRANSACTIONS_LAYOUT}>
	<input type="date" class="ring-inset" bind:value={transaction.date} />
	<input type="number" class="ring-inset" placeholder="?" bind:value={transaction.amount} />
	<select class="ring-inset" bind:value={transaction.categoryId}>
		<!-- Todo categories -->
		<option value="" />
		<option>One</option>
		<option>Two</option>
	</select>
	<input type="text" class="ring-inset" bind:value={transaction.title} />
</div>
