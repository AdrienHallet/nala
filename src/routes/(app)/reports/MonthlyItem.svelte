<script lang="ts">
	import { amountFormat } from '$ui/formatters.js';
	import { Monthly } from '../../../core/model/stats/monthly';
	import { MONTHLY_LAYOUT } from './constants.js';

	export let monthly: Monthly;
</script>

<div class={MONTHLY_LAYOUT}>
	<div>{monthly.month}</div>
	<div class="text-right">{amountFormat(monthly.income)}</div>
	<div class="text-right">{amountFormat(monthly.expense)}</div>
	<div class="text-right">{amountFormat(monthly.income + monthly.expense)}</div>
</div>
