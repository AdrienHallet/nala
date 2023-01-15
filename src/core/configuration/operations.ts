import { configuration } from "./state";

export function initialize(data: App.PageData & Record<string, string>) {
    configuration.set({
        user: {
            name: data?.session?.user?.name as string,
            avatarUrl: data?.session?.user?.image as string,
        },
        accessToken: data?.accessToken as string,
        ui: {
            menuCollapsed: localStorage.getItem('menuCollapsed') === 'true',
        }
    })
}

export function toggleMenu() {
    configuration.update((config) => {
        localStorage.setItem('menuCollapsed', String(!config.ui.menuCollapsed));
        return {
            ...config,
            ui: {
                ...config.ui,
                menuCollapsed: !config.ui.menuCollapsed,
            }
        };
    });
};