import { getBlob, getContent } from "$core/api/github";
import { configuration } from "$core/configuration/state";
import { base64ToBlob } from "$core/utils/file";
import { get } from "svelte/store";

export async function getGithubDatabase(): Promise<[blob: Blob, sha: string]> {
    const config = get(configuration);

    const content = await getContent(config.user.name, config.github.repository);
    if (content.isOk()) {
        const downloaded = await getBlob(content.ok()[0].git_url);
        if (downloaded.isOk()) {
            const blob = await base64ToBlob(downloaded.ok().content);
            return [blob, downloaded.ok().sha];
        }
        throw new Error('undefined flow: donwloaded blob not ok');
    }
    throw new Error('undefined flow: dowloaded content not ok');
}