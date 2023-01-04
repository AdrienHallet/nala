<script>
	import Dashboard from '$ui/icons/dashboard.svelte';
	import Hamburger from '$ui/icons/hamburger.svelte';
	import Logo from '$ui/icons/logo.svelte';
	import SidbarItem from '$ui/specifics/layout/sidbar-item.svelte';

	let collapse = false;

	const toggleMenu = () => {
		collapse = !collapse;
	};
</script>

<div class="flex h-16 w-full items-center justify-between bg-zinc-900">
	<div
		class="relative flex items-center text-zinc-300 transition-width duration-500 {collapse
			? 'sm:w-16'
			: 'sm:w-64'} "
	>
		<span class="hidden items-center sm:flex">
			<Logo
				classes="h-6 transition-all duration-100 delay-150 ease-in pl-3 {collapse
					? 'opacity-0'
					: ''}"
			/>
			<span
				class="pl-3 text-2xl transition-all delay-150 duration-100 ease-in {collapse
					? 'opacity-0'
					: ''}">NALAssistant</span
			>
		</span>
		<span
			on:click={toggleMenu}
			on:keypress={toggleMenu}
			class="absolute transition-all duration-500 {collapse ? 'sm:right-6' : 'sm:right-0'}"
		>
			<Hamburger classes="h-6" bind:collapsed={collapse} />
		</span>
	</div>
</div>
<div class="flex h-full w-full flex-col sm:flex-row">
	<div
		id="Main"
		class="h-full w-full transform flex-col items-start justify-start bg-zinc-900 transition-width duration-500 ease-in-out sm:w-64 xl:translate-x-0 xl:rounded-r {collapse
			? 'hidden sm:flex sm:w-16'
			: 'sm:w-64'} "
	>
		<div
			class="mt-6 flex w-full flex-col items-center justify-start space-y-3 border-b border-gray-600 pl-4 pb-5 "
		>
			<SidbarItem bind:collapse>
				<Dashboard classes="h-6 absolute" slot="icon" />
				Dashboard
			</SidbarItem>
			<SidbarItem bind:collapse>
				<Dashboard classes="h-6 absolute" slot="icon" />
				Dashboard
			</SidbarItem>
		</div>
	</div>
	<div class="flex h-full w-full">
		<slot />
	</div>
</div>
