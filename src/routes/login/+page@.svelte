<script>
	import { signIn } from '@auth/sveltekit/client';
	import Logo from '$ui/icons/logo.svelte';
	import GithubButton from '$ui/components/GithubButton.svelte';
	import Github from '$ui/icons/github.svelte';

	let isLoggingIn = false;
</script>

<div class="grid h-full content-center">
	<div
		class="mx-auto flex h-[400px] w-[300px] flex-col justify-evenly rounded-sm border border-zinc-400 bg-zinc-600 shadow-2xl shadow-zinc-700 drop-shadow-2xl"
	>
		<div class="px-3 text-zinc-900">
			<Logo />
		</div>
		<hr class="mx-3 border-zinc-700" />
		<div class="flex content-center justify-center">
			<GithubButton
				lg
				on:click={() => {
					isLoggingIn = true;
					signIn('github').then(
						() => {}, // Github will auto-redirect on success
						() => (isLoggingIn = false),
					);
				}}
				disabled={isLoggingIn}
				loading={isLoggingIn}
			>
				<Github slot="icon" classes="h-6" />
				Continue with GitHub
			</GithubButton>
		</div>
	</div>
</div>
