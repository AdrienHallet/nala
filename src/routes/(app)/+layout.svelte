<script lang="ts">
	import { total } from '$core/database/balance/state.js';
	import { amountFormat } from '$ui/formatters.js';
	import Dashboard from '$ui/icons/dashboard.svelte';
	import Hamburger from '$ui/icons/hamburger.svelte';
	import TableCells from '$ui/icons/table-cells.svelte';
	import Tag from '$ui/icons/tag.svelte';
	import Logo from '$ui/icons/logo.svelte';
	import Avatar from '$ui/specifics/layout/avatar.svelte';
	import SidebarItem from '$ui/specifics/layout/sidebar-item.svelte';
	import Syncer from '$ui/specifics/layout/syncer.svelte';
	import { page } from '$app/stores';
	import { initialize, toggleMenu } from '$core/configuration/operations';
	import { configuration } from '$core/configuration/state';
	import { NalaDatabase } from '$core/database/database.js';
	import { getTransactions } from '../../core/database/transaction/operations';

	initialize($page.data);
	NalaDatabase.get();

	getTransactions();

	$: collapse = $configuration.ui.menuCollapsed;
</script>

<div
	class="grid grid-cols-[4rem_1fr_4rem] grid-rows-[4rem] bg-zinc-900 transition-all duration-500 ease-in-out {collapse
		? 'sm:grid-cols-[4rem_1fr_0rem]'
		: 'sm:grid-cols-[16rem_1fr_16rem] md:grid-cols-[16rem_1fr_0rem]'}"
>
	<div on:click={toggleMenu} on:keypress={toggleMenu} class="relative flex items-center ">
		<div
			class="invisible flex pl-3 transition-opacity delay-150 ease-in sm:visible {collapse
				? 'opacity-0'
				: ''}"
		>
			<Logo classes="h-6 my-auto" />
			<span class="pl-2 text-2xl">NALA</span>
		</div>
		<Hamburger
			classes="h-6 top-5 absolute flex-grow right-5 hover:cursor-pointer hover:text-zinc-600"
			bind:collapsed={collapse}
		/>
	</div>
	<div class="flex items-center">
		<div
			class="invisible absolute flex transition-opacity delay-150 sm:visible {collapse
				? ''
				: 'opacity-0'}"
		>
			<Logo classes="h-6 my-auto" />
			<span class="pl-2 text-2xl">NALA</span>
		</div>
		{#if $total}
			<div class="flex-grow text-center">Tot.: € {amountFormat($total?.toFixed(2))}</div>
		{/if}
	</div>
	<div class="flex items-center gap-3 justify-self-end pr-3">
		<Syncer />
		<Avatar username={$configuration.user.name} avatarUrl={$configuration.user.avatarUrl} />
	</div>
</div>
<div
	class="z-0 grid h-full overflow-auto overflow-x-hidden transition-all duration-500 ease-in-out {collapse
		? 'sm:grid-cols-[4rem_1fr_0rem]'
		: 'sm:grid-cols-[16rem_1fr_0rem]'}"
>
	<div
		id="Main"
		class="absolute z-50 h-[calc(100vh-4rem)] w-full transform items-start justify-start overflow-x-hidden overflow-y-hidden bg-zinc-900 transition-all duration-500 ease-in-out sm:relative sm:h-auto xl:translate-x-0 xl:rounded-r {collapse
			? '-translate-x-full sm:flex sm:w-16 sm:translate-x-0'
			: 'sm:w-64'} "
	>
		<div
			class="flex h-full w-full grow flex-col items-center justify-start overflow-y-auto overflow-x-hidden py-2"
		>
			<SidebarItem bind:collapse link="/">
				<Dashboard classes="w-6" slot="icon" />
				Dashboard
			</SidebarItem>
			<SidebarItem bind:collapse link="/transactions">
				<TableCells classes="w-6" slot="icon" />
				Transactions
			</SidebarItem>
			<SidebarItem bind:collapse link="/categories">
				<Tag classes="w-6" slot="icon" />
				Categories
			</SidebarItem>
			<div class="flex w-full flex-col items-center px-3">
				<hr class="flex h-px w-full border-zinc-400" />
			</div>
		</div>
	</div>
	<div class="h-full overflow-y-auto">
		<slot />
	</div>
</div>
