import { getBlob, getContent } from "$core/api/github";
import { configuration } from "$core/configuration/state";
import { base64ToBlob } from "$core/utils/file";
import { get } from "svelte/store";

export async function getGithubDatabase(): Promise<[blob: Blob, sha: string]> {
    const config = get(configuration);

    try {
        const content = await getContent(config.user.name, config.github.repository);
        console.log('content:');
        console.log(content);
        const downloaded = await getBlob(content[0].git_url);
        const blob = base64ToBlob(downloaded.content);
        return [blob, downloaded.sha];

    } catch (error) {
        if (error.status === 404) {
            console.log('not found');
        } else {
            console.log('other');
            console.log(error);
        }
    }

}