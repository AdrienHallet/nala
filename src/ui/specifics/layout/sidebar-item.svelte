<script lang="ts">
	import { toggleMenu } from '../../../core/configuration/operations';

	export let collapse = false;
	export let link = '#';

	let item: Element;

	function onMenuItemClick() {
		if (item.clientWidth === window.innerWidth) {
			toggleMenu();
		}
	}
</script>

<a
	bind:this={item}
	on:click={onMenuItemClick}
	class="grid min-h-[3rem] w-full grid-cols-[4rem_1fr] items-center hover:bg-zinc-700"
	href={link}
>
	<div class="justify-self-center">
		<slot name="icon" />
	</div>
	<p
		class="justify-self-start text-xl transition-opacity duration-200 ease-in-out {collapse
			? 'opacity-0'
			: 'opacity-100 delay-200'}"
	>
		<slot />
	</p>
</a>
