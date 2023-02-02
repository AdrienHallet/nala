import type { GithubConfiguration } from "$core/model/github-configuration";
import type { Optional } from "$core/model/optional";
import type { User } from "$core/model/user";
import { writable, type Writable } from "svelte/store";

export const configuration: Writable<Configuration> = writable();

/**
 * The technical configuration of the application, a bunch of internal technicals.
 */
export interface Configuration {
    user: User;
    github: GithubConfiguration;
    database: {
        name: string;
        sha: Optional<string>;
        isLoading: boolean;
    }
    ui: {
        menuCollapsed: boolean;
    }
}