import { setDatabaseSha } from "$core/configuration/operations";
import { Optional } from "$core/model/optional";
import Dexie from "dexie";
import {get} from 'svelte/store';
import {configuration} from '$core/configuration/state';
import {getGithubDatabase} from '$core/database/database-retriever';
export class NalaDatabase extends Dexie {

    private instance: Optional<NalaDatabase> = Optional.empty();

    private constructor(
        name: string,
    ) {
        super(name);
    }

    public async get(): Promise<NalaDatabase> {
        if (!this.instance.isPresent()) {
            // If there is no database, create it
            const currentConfig = get(configuration);
            const retrievedDatabase = await getGithubDatabase();
            this.instance = Optional.of(new NalaDatabase(currentConfig.database.name));
            if (retrievedDatabase.isPresent()) {
                // If there is a downloaded file, import it
                await this.load(retrievedDatabase.get());
            }
        }
        return this.instance.get();
    }

    private async load([blob, sha]: [Blob, string]): Promise<void> {
        // Todo figure out why version 4 no longer exports types
        await import("dexie-export-import");
        return super.import(blob, {
            clearTablesBeforeImport: true,
            acceptVersionDiff: true,
        }).then(() => setDatabaseSha(sha))
    }
}