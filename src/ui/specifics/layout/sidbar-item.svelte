<script lang="ts">
	export let collapse = false;
</script>

<button
	class="jusitfy-start flex h-10 w-full items-center space-x-11 rounded text-white hover:bg-zinc-700 focus:bg-zinc-700"
>
	<slot name="icon" />
	<p
		class=" my-auto text-xl transition-opacity duration-200 ease-in-out {collapse
			? 'opacity-0'
			: 'opacity-100 delay-200'}"
	>
		<slot />
	</p>
</button>
