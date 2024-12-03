export function localSync(type: string, data: { [key: string]: unknown }) {
    localStorage.setItem(type, JSON.stringify(data));
}

export function localFetch(type: string): { [key: string]: unknown }[] {
    const data = localStorage.getItem(type);
    return data ? JSON.parse(data) : [];
}

export function localFlush() {
    localStorage.clear();
}

export function sessionSync(type: string, data: { [key: string]: unknown }) {
    sessionStorage.setItem(type, JSON.stringify(data));
}

export function sessionFetch(type: string): { [key: string]: unknown }[] {
    const data = sessionStorage.getItem(type);
    return data ? JSON.parse(data) : [];
}

export function sessionFlush() {
    sessionStorage.clear();
}