<script lang="ts">
	import { fade } from 'svelte/transition';

	export let username: string;
	export let avatarUrl: string;
</script>

<div class="relative flex cursor-pointer rounded-full bg-zinc-700 p-1 hover:bg-zinc-300">
	<img src={avatarUrl} alt={username} class="h-6 max-w-none" />
</div>
