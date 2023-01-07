<script>
	import Dashboard from '$ui/icons/dashboard.svelte';
	import Hamburger from '$ui/icons/hamburger.svelte';
	import Logo from '$ui/icons/logo.svelte';
	import SidbarItem from '$ui/specifics/layout/sidbar-item.svelte';

	let collapse = true;

	const toggleMenu = () => {
		collapse = !collapse;
	};
</script>

<div class="z-50 flex h-16 w-full items-center bg-zinc-900 text-zinc-300">
	<div
		class="relative flex h-full items-center transition-width duration-500 {collapse
			? 'sm:w-16'
			: 'sm:w-64'} "
	>
		<span
			class="hidden items-center transition-opacity delay-150 duration-100 ease-in sm:flex {collapse
				? 'opacity-0'
				: ''}"
		>
			<Logo classes="h-6 pl-3 " />
			<span class="pl-3 text-2xl">NALAssistant</span>
		</span>
		<span
			on:click={toggleMenu}
			on:keypress={toggleMenu}
			class="absolute left-5 z-50 transition-all duration-500 sm:left-auto {collapse
				? 'sm:right-5'
				: 'sm:right-1'}"
		>
			<Hamburger classes="w-6" bind:collapsed={collapse} />
		</span>
	</div>
	<div
		class="flex flex-grow items-center justify-center justify-items-center transition-opacity duration-100 ease-in sm:left-16 sm:flex-none {collapse
			? 'sm:delay-200'
			: 'sm:hidden sm:opacity-0'}"
	>
		<Logo classes="h-6" />
		<span class="hidden pl-3 text-2xl sm:block">NALAssistant</span>
	</div>
</div>
<div class="z-0 flex w-full flex-grow flex-row overflow-auto overflow-x-hidden">
	<div
		id="Main"
		class="absolute z-50 h-full max-h-full w-full transform items-start justify-start overflow-y-auto overflow-x-hidden bg-zinc-900 transition-all duration-500 ease-in-out sm:relative sm:h-auto xl:translate-x-0 xl:rounded-r {collapse
			? '-translate-x-full sm:flex sm:w-16 sm:translate-x-0'
			: 'sm:w-64'} "
	>
		<div class="mt-6 flex w-full flex-col items-center justify-start space-y-3 pl-5 pb-5">
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Dashboard
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="w-6 absolute" slot="icon" />
				Yet Another Item
			</SidbarItem>
			<hr class="mr-4 h-px w-full border-zinc-400" />
		</div>
	</div>
	<div class="">
		<slot />
	</div>
</div>
