import { Optional } from "$core/model/optional";
import type { ISessionToken } from "$core/model/session-token";
import { env } from "$env/dynamic/public";
import { configuration } from "./state";

const LOCAL_MENU_COLLAPSED = 'menu-collapsed';
const LOCAL_DB_SHA = 'database-sha';

export function initialize(data: App.PageData & Record<string, string>) {
    configuration.set({
        user: {
            name: data?.session?.user?.name as string,
            avatarUrl: data?.session?.user?.image as string,
        },
        database: {
            name: env.PUBLIC_DATABASE_NAME as string,
            sha: Optional.ofNullable(localStorage.getItem(LOCAL_DB_SHA)),
            isLoading: true,
        },
        github: {
            repository: env.PUBLIC_REPOSITORY_NAME as string,
            accessToken: (data?.session as ISessionToken)?.accessToken as string,
        },
        ui: {
            menuCollapsed: localStorage.getItem(LOCAL_MENU_COLLAPSED) === 'true',
        }
    })
}

export function toggleMenu() {
    configuration.update((config) => {
        localStorage.setItem(LOCAL_MENU_COLLAPSED, String(!config.ui.menuCollapsed));
        return {
            ...config,
            ui: {
                ...config.ui,
                menuCollapsed: !config.ui.menuCollapsed,
            }
        };
    });
};

export function setDatabaseSha(sha: string) {
    configuration.update((config) => {
        localStorage.setItem('databaseSha', sha);
        return {
            ...config,
            database: {
                ...config.database,
                sha: Optional.of(sha),
            }
        }
    })
}