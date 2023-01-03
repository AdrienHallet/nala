<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Logo from '$ui/icons/logo.svelte';
	import Button from '$ui/components/button.svelte';
	import Github from '$ui/icons/github.svelte';
</script>

<button on:click={() => signOut()} class="button">Sign out</button>
