import { setDatabaseSha } from "$core/configuration/operations";
import type { Configuration } from "$core/configuration/state";
import type { Optional } from "$core/model/optional";
import Dexie from "dexie";

export class NalaDatabase extends Dexie {

    private constructor(
        configuration: Configuration,
        imported: Optional<[Blob, string]>,
    ) {
        super(configuration.database.name);
        if (imported.isPresent()) {
            this.load(imported.get());
        }
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