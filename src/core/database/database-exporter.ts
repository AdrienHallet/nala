import { get } from 'svelte/store';
import { configuration } from '$core/configuration/state';
import { NalaDatabase } from '$core/database/database';
import { putBlob } from '$core/api/github';
import { setDatabaseSha } from '$core/configuration/operations';

export async function databaseExporter() {
	const config = get(configuration);

	const db = await NalaDatabase.get();
	const blob = await db.export();
	console.log(blob);
	const sha = config.database.sha.or(undefined);
	const response = await putBlob(
		config.user.name,
		config.github.repository,
		blob,
		config.database.name,
		sha,
	);
	if (response.isOk()) {
		setDatabaseSha((await response.ok().json()).content.sha);
		return;
	}
	throw new Error('Unhandled erroneous upload flow');
}
