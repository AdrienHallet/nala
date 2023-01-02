import type { Session } from "@auth/core/types";
import { redirect } from "@sveltejs/kit";

/**
 * Throws a redirect if the user is not authenticated and trying to access a protected page.
 */
export const authenticationGuard = (session: Session | null, path: string) => {
    if (session != null || openPaths.includes(path)) {
        // User is either authenticated or trying to access a page that does not require authentication
        return;
    }
    throw redirect(307, '/login');
}

/**
 * Paths that can be accessed without authentication
 */
const openPaths = [
    '/login',
]