import type { GithubConfiguration } from "$core/model/github-configuration";
import type { User } from "$core/model/user";
import { writable, type Writable } from "svelte/store";

export const configuration: Writable<Configuration> = writable();

/**
 * The technical configuration of the application, a bunch of internal technicals.
 */
export interface Configuration {
    user: User;
    github: GithubConfiguration;
    ui: {
        menuCollapsed: boolean;
    }
}