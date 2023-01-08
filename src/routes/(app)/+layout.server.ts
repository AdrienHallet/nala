import { authenticationGuard } from "$core/auth";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  authenticationGuard(session, event.url.pathname);
  return {
    session,
  }
}