import { FetchWrapper } from "./fetchWrapper";

const GITHUB_BASE_URL = "https://api.github.com";

export default function generateHeaders(token: string): Record<string, string> {
    return {
        "Accept": " application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
}

const client = new FetchWrapper(GITHUB_BASE_URL);

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

export async function getUserData(access_token: string) {
    return await client.get(`/user`, { headers: generateHeaders(access_token) })
}

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

export async function deleteRepository(access_token: string, data: {
    owner: string,
    repo: string
}): Promise<Response> {
    return await client.delete(`/repos/${data.owner}/${data.repo}`, {
        headers: generateHeaders(access_token)
    })
}

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

export async function getRepositoryContent(access_token: string, q_params: {
    owner: string,
    repo: string,
    path: string
}): Promise<Response> {
    return await client.get(`/repos/${q_params.owner}/${q_params.repo}/contents/${q_params.path}`, {
        headers: generateHeaders(access_token)
    })
}

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