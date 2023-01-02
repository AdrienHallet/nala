<script lang="ts">
	import '../app.css';
</script>

<div class="bg-gradient-to-r from-zinc-800  to-stone-800 h-full grid content-center">
	<div
		class="mx-auto bg-zinc-600 h-[400px] w-[300px] rounded-sm shadow-2xl shadow-zinc-700 drop-shadow-2xl border border-zinc-400"
	>
		<div class="absolute z-0">
			<!-- <div class="screen__background__shape2 bg-slate-50" /> -->
		</div>
		<div class="relative z-10 m-3">
			<slot />
		</div>
	</div>
</div>

<style>
	.screen__background__shape2 {
		height: 220px;
		width: 22px;
		top: -172px;
		right: 0;
		border-radius: 2px;
		transform: rotate(30deg);
	}
</style>
