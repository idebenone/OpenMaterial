import { sessionSync } from "./local";

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const SCOPE = import.meta.env.VITE_GITHUB_SCOPE;

const GITHUB_REDIRECT_URI = window.origin + `/auth/callback`
const STATE = Math.random() * 100;

export const requestUserIdentity = (ALLOW_SIGNUP: boolean): string => {
    const params = `client_id=${CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=${SCOPE}&state=${STATE}&allow_signup=${ALLOW_SIGNUP}`
    sessionSync("state", { STATE })
    return `https://github.com/login/oauth/authorize?${params}`
}