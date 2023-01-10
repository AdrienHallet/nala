<script lang="ts">
	import ChevronDown from '$ui/icons/chevron-down.svelte';
	import { fade } from 'svelte/transition';

	export let username: string;
	export let avatarUrl: string;
</script>

<div class="relative flex cursor-pointer rounded-full bg-zinc-700 p-1 hover:bg-zinc-800">
	<img src={avatarUrl} alt={username} class="h-6 max-w-none" />
	<span class="my-auto hidden flex-row flex-nowrap pr-2 pl-1 text-sm sm:flex">
		{username}
		<ChevronDown classes="h-3 pl-2 my-auto" />
	</span>
</div>
