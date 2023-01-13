import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import type { Provider } from "@auth/core/providers"
import type { ISessionToken } from "$core/model/session-token"

/**
 * 
 */
export const handle = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: GITHUB_ID, clientSecret: GITHUB_SECRET, authorization: {
                params: {
                    scope: 'repo read:user user:email'
                }
            }
        }) as Provider
    ],
    callbacks: {
        async session({ session, token }) {
            (session as ISessionToken).accessToken = token.accessToken as string;
            return session
        },

        async jwt({ token, account }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    },
}
)