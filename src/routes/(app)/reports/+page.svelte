<script lang="ts">
	import { monthlyState } from '$core/database/balance/state.js';
</script>

{#each $monthlyState.reverse() as monthly}
	<br />
	{monthly.month} | {monthly.income} | {monthly.expense}
{/each}
