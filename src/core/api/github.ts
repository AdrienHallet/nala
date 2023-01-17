// GitHub API v3

import { configuration, type Configuration } from "$core/configuration/state";
import type { GithubRepository } from "$core/model/github-repository";
import { Optional } from "$core/model/optional";
import { get } from "svelte/store";

const baseURL = 'https://api.github.com';
let config: Optional<Configuration> = Optional.empty();

/**
 * Returns the contents of a GitHub repository.
 */
export async function getRepository(repositoryName: string): Promise<GithubRepository> {
    const response = await gitFetch(`${baseURL}/${config.get().user.name}/${repositoryName}`)
    return response.json() as Promise<GithubRepository>
}

async function gitFetch(url: RequestInfo, options?: RequestInit) {
    if (!config.isPresent()) {
        setToken()
    }
    const updatedOptions = { ...options };
    updatedOptions.headers = {
        ...updatedOptions.headers,
        Authorization: `Bearer ${config.get().github.accessToken}`,
    }
    const response = await fetch(url, updatedOptions)
    if (!response.ok) {
        throw new Error(response + '');
    }
    return response;
}

function setToken() {
    // Acceptable because the properties are extremely static
    config = Optional.of(get(configuration))
    if (config.get() == null) {
        throw new Error("Cannot contact GitHub API without configuration");
    }
}