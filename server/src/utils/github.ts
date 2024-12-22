import { FetchWrapper } from "./fetchWrapper";

const GITHUB_BASE_URL = "https://api.github.com";
const client = new FetchWrapper(GITHUB_BASE_URL);

/**
 * Utility function to generate headers for GitHub API's
 * @param token 
 * @returns 
 */
export default function generateHeaders(token: string): Record<string, string> {
    return {
        "Accept": " application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
}

/**
 * API which returns access_token in return for exchanging code.
 * @param code 
 * @param client_id 
 * @param client_secret 
 * @returns 
 */
export async function getTokenResponse(code: string, client_id: string, client_secret: string): Promise<Response> {
    return await fetch(
        `https://github.com/login/oauth/access_token?code=${code}&client_id=${client_id}&client_secret=${client_secret}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        }
    );
}

/**
 * API to fetch user data.
 * @param access_token 
 * @returns 
 */
export async function getUserData(access_token: string) {
    return await client.get(`/user`, { headers: generateHeaders(access_token) })
}

/**
 * API to create a repository from a template.
 * @param access_token 
 * @param data 
 * @returns 
 */
export async function createRepository(access_token: string, data: {
    owner: string,
    name: string,
    description: string,
    include_all_branches: boolean,
    private: boolean
}): Promise<Response> {
    return await client.post(`/repos/idebenone/template_repo/generate`, data, {
        headers: generateHeaders(access_token)
    })
}

/**
 * API to delete a repository.
 * @param access_token 
 * @param data 
 * @returns 
 */
export async function deleteRepository(access_token: string, data: {
    owner: string,
    repo: string
}): Promise<Response> {
    return await client.delete(`/repos/${data.owner}/${data.repo}`, {
        headers: generateHeaders(access_token)
    })
}

/**
 * API to update a repository.
 * @param access_token 
 * @param q_params 
 * @param data 
 * @returns 
 */
export async function updateRepository(access_token: string, q_params: { owner: string, repo: string },
    data: {
        name: string,
        description: string,
        private: string,
    }): Promise<Response> {
    return await client.patch(`/repos/${q_params.owner}/${q_params.repo}`, data, {
        headers: generateHeaders(access_token)
    })
}

/**
 * API to fetch repository content.
 * @param access_token 
 * @param q_params 
 * @returns 
 */
export async function getRepositoryContent(access_token: string, q_params: {
    owner: string,
    repo: string,
    path: string
}): Promise<Response> {
    return await client.get(`/repos/${q_params.owner}/${q_params.repo}/contents/${q_params.path}`, {
        headers: generateHeaders(access_token)
    })
}

/**
 * API to create/update repository content.
 * @param access_token 
 * @param q_params 
 * @param data 
 * @returns 
 */
export async function createUpdateContent(access_token: string,
    q_params: {
        owner: string,
        repo: string,
        path: string,
    }, data: {
        message: string,
        committer: { name: string, email: string },
        content: string
    }): Promise<Response> {
    return await client.put(
        `/repos/${q_params.owner}/${q_params.repo}/contents/${q_params.path}`, data, {
        headers: generateHeaders(access_token)
    })
}

/**
 * API to delete repository content;
 * @param access_token 
 * @param q_params 
 * @param data 
 * @returns 
 */
export async function deleteContent(access_token: string,
    q_params: {
        owner: string,
        repo: string,
        path: string,
    }, data: {
        message: string,
        committer: { name: string, email: string },
        sha: string
    }
): Promise<Response> {
    return await client.delete(
        `/repos/${q_params.owner}/${q_params.repo}/contents/${q_params.path}`, data, {
        headers: generateHeaders(access_token)
    })
}