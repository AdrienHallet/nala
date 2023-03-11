<script lang="ts">
	export let collapse = false;
	export let link = '#';
</script>

<a class="grid min-h-[3rem] w-full grid-cols-[4rem_1fr] items-center hover:bg-zinc-700" href={link}>
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
