import { setDatabaseSha } from '$core/configuration/operations';
import { Optional } from '$core/model/optional';
import Dexie from 'dexie';
import { get } from 'svelte/store';
import { configuration } from '$core/configuration/state';
import { getGithubDatabase } from '$core/database/database-retriever';
import type { Transaction } from '$core/model/database/transaction';
import { setLoading } from '$core/loading/operations';
import { LoadingComponent } from '$core/model/loading/component';
import type { Category } from '../model/database/category';

export class NalaDatabase extends Dexie {
	public transactions!: Dexie.Table<Transaction, number>;
	public categories!: Dexie.Table<Category, number>;

	private static instance: Optional<NalaDatabase> = Optional.empty();

	private constructor(name: string) {
		super(name);
		this.initSchema();
	}

	public static async get(): Promise<NalaDatabase> {
		if (!this.instance.isPresent()) {
			// If there is no database, create it
			const currentConfig = get(configuration);
			const database = new NalaDatabase(currentConfig.database.name);
			const retrievedDatabase = await getGithubDatabase();
			if (retrievedDatabase.isPresent()) {
				// If there is a downloaded file, import it
				await database.load(retrievedDatabase.get());
			}
			this.instance = Optional.of(database);
			setLoading(LoadingComponent.DATABASE, false);
		}
		return this.instance.get();
	}

	private async load([blob, sha]: [Blob, string]): Promise<void> {
		// Todo figure out why version 4 no longer exports types
		await import('dexie-export-import');
		return super
			.import(blob, {
				clearTablesBeforeImport: true,
				overwriteValues: true,
				acceptVersionDiff: true,
			})
			.then(() => setDatabaseSha(sha));
	}

	async export(): Promise<Blob> {
		await import('dexie-export-import');
		return super.export();
	}

	private initSchema() {
		this.version(1).stores({
			transactions: '++id, date, amount, title, categoryId',
			categories: '++id, name, description',
		});
	}
}
