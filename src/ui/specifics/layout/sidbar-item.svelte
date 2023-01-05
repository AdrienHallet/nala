<script lang="ts">
	export let collapse = false;
</script>

<button
	class="jusitfy-start flex w-full items-center space-x-11 rounded text-white focus:text-indigo-400 focus:outline-none "
>
	<slot name="icon" />
	<p
		class="my-auto text-xl transition-opacity delay-150 ease-in-out {collapse
			? 'opacity-0'
			: 'opacity-100'}"
	>
		<slot />
	</p>
</button>
