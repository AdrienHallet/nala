import { createRepository, getBlob, getContent } from "$core/api/github";
import { configuration, type Configuration } from "$core/configuration/state";
import type { FetchError } from "$core/model/fetch.error";
import { Optional } from "$core/model/optional";
import { base64ToBlob } from "$core/utils/file";
import { get } from "svelte/store";

export async function getGithubDatabase(): Promise<Optional<[Blob, string]>> {
    const config = get(configuration);

    const content = await getContent(config.user.name, config.github.repository);
    if (content.isOk()) {
        const downloaded = await getBlob(content.ok()[0].git_url);
        if (downloaded.isOk()) {
            const blob = await base64ToBlob(downloaded.ok().content);
            return Optional.of([blob, downloaded.ok().sha]);
        }
        throw new Error('undefined flow: donwloaded blob not ok');
    }
    return handleRepositoryDownloadFailure(content.err(), config);
}

async function handleRepositoryDownloadFailure(error: FetchError, config: Configuration): Promise<Optional<[Blob, string]>> {
    if (error.status == 404) {
        // Repository does not exist, probably the first time user accesses the app
        const createResponse = await createRepository(config.github.repository);
        if (createResponse.isOk()) {
            // Repository successfully created!
            return Optional.empty();
        }
        if (createResponse.err().status == 422) {
            // Repository actually existed, therefore it's the file that must be missing
            // So consider a successful creation!
            return Optional.empty();
        }
        throw new Error('[GitHub] Could not create repository for an unhandled reason');
    }
    throw new Error('Unhandled error in repository donwload failure');
}