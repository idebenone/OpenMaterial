export default function generateHeaders(token: string) {
    return {
        "Authorization": `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Accept": " application/vnd.github+json"
    }
}