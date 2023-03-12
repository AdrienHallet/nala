<script lang="ts">
	import { total } from '$core/database/balance/state.js';
	import { transactions } from '$core/database/transaction/state.js';
	import { amountFormat } from '$ui/formatters.js';
	import Balance from '$ui/graphs/balance/balance.svelte';
	import Logo from '$ui/icons/logo.svelte';
</script>

<div class="grid h-full min-h-[600px] grid-rows-2">
	<div class="m-10 w-full max-w-[1200px] justify-self-center">
		<div class="grid h-full grid-cols-2 grid-rows-1 p-5 shadow-2xl">
			<div class="h-full w-full border-r border-r-zinc-500 p-4">
				<h3 class="pb-2 text-2xl font-semibold">Totals</h3>
				<ul class="pl-3">
					<li><span class="font-semibold">Balance:</span>&nbsp€&nbsp{amountFormat($total)}</li>
					<li><span class="font-semibold">Transactions:</span>&nbsp{$transactions?.length}</li>
				</ul>
			</div>
			<Logo classes="h-full w-full justify-self-center opacity-10 px-5" />
		</div>
	</div>
	<Balance />
</div>
