import type { Session } from "@auth/core/types";

export interface ISessionToken extends Session {
    accessToken?: string;
} 