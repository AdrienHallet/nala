<script lang="ts">
	import ArrowUp from '$ui/icons/arrow-up.svelte';
	import { derived, type Readable } from 'svelte/store';
	import { databaseExporter } from '$core/database/database-exporter';
	import { categoriesChange } from '../../../core/database/category/state';
	import { transactionsChange } from '../../../core/database/transaction/state';
	import { loading } from '../../../core/loading/state';
	import { DatabaseChange } from '../../../core/model/database/database-change';
	import { Loading } from '../../../core/model/loading/loading';

	// When the syncer is actively listening
	let isActive = true;
	// When the syncer is processing changes
	let isProcessing = false;
	// When the syncer has no change to process
	let isFresh = true;

	const databaseChange: Readable<DatabaseChange> = derived(
		[transactionsChange, categoriesChange],
		(values, set) => {
			set(new DatabaseChange(values[0], values[1]));
		},
	);

	$: $loading, onLoadingChange($loading);

	function onLoadingChange(loading: Loading) {
		isActive = !loading.database;
	}

	$: $databaseChange, onDatabaseChange($databaseChange);

	function onDatabaseChange(changes: DatabaseChange) {
		if (changes.hasChange()) {
			processChange();
		}
	}

	let exportTimeout: NodeJS.Timer;
	function processChange() {
		if (!isActive) {
			// DB synchronization de-activated
			return;
		}
		isFresh = false;
		if (exportTimeout) {
			clearInterval(exportTimeout);
		}
		exportTimeout = setInterval(exportDatabase, 5000);
	}

	async function exportDatabase() {
		clearInterval(exportTimeout);
		isProcessing = true;
		await databaseExporter();
		isProcessing = false;
		isFresh = true;
	}

	function toggle() {
		isActive = !isActive;
		if (!isActive) {
			clearInterval(exportTimeout);
			return;
		}
		onDatabaseChange($databaseChange);
	}
</script>

<div
	class="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border-zinc-600 hover:border"
	on:click={toggle}
	on:keypress={toggle}
>
	{#if isActive}
		{#if isProcessing}
			<div class="animate-bounce text-orange-600">
				<ArrowUp />
			</div>
		{:else if isFresh}
			<span class="h-2 w-2 rounded-full bg-green-600" />
		{:else}
			<span class="h-2 w-2 rounded-full bg-orange-600" />
		{/if}
	{:else}
		<span class="h-2 w-2 rounded-full bg-red-600 align-middle" />
	{/if}
</div>
