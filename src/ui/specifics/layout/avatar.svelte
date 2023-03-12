<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import ChevronDown from '$ui/icons/chevron-down.svelte';
	import { slide } from 'svelte/transition';
	import LogOut from '$ui/icons/log-out.svelte';

	export let username: string;
	export let avatarUrl: string;

	let isExpanded = false;
	let component: Node;

	function toggleMenu() {
		isExpanded = !isExpanded;
		if (isExpanded) {
			document.addEventListener('click', handleOutsideEventClick, true);
			document.addEventListener('keyup', handleOutsideEventKey, true);
		} else {
			document.removeEventListener('click', handleOutsideEventClick, true);
			document.removeEventListener('keyup', handleOutsideEventKey, true);
		}
	}

	function handleOutsideEventClick(event: any) {
		if (component.contains(event.target)) {
			return;
		}
		// Toggle whenever there is a click outside the component
		toggleMenu();
	}

	function handleOutsideEventKey(event: any) {
		if (event.key != 'Escape') {
			return;
		}
		// Only toggle when Escape key is used
		toggleMenu();
	}
</script>

<div bind:this={component} class="relative">
	<div
		class="relative flex cursor-pointer rounded-full border border-zinc-600 bg-zinc-700 p-1 hover:bg-zinc-800 {isExpanded
			? 'sm:rounded-b-none sm:rounded-t-2xl'
			: ''}"
		on:click={toggleMenu}
		on:keydown={toggleMenu}
	>
		<img src={avatarUrl} alt={username} class="h-6 max-w-none" />
		<span class="my-auto hidden flex-row flex-nowrap pr-2 pl-1 text-sm sm:flex">
			{username}
			<ChevronDown classes="h-3 pl-2 my-auto" />
		</span>
	</div>
	{#if isExpanded}
		<nav
			class="absolute right-0 top-8 z-50 mt-2 w-32 min-w-full rounded-md border border-zinc-600 bg-zinc-700 pt-1 text-base sm:rounded-t-none"
		>
			<hr class="mt-1 border-zinc-500" />
			<ul transition:slide={{ duration: 100 }}>
				<li
					on:click={signOut}
					on:keydown={signOut}
					class="flex h-8 cursor-pointer pl-3 hover:border-0 hover:bg-zinc-800"
				>
					<LogOut classes="h-4 my-auto" />
					<span class="my-auto pl-4">Log Out</span>
				</li>
			</ul>
			<hr class="border-zinc-500 pb-2" />
		</nav>
	{/if}
</div>
