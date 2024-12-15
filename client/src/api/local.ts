export function localSync(type: string, data: string | object) {
    localStorage.setItem(type, typeof (data) === "object" ? JSON.stringify(data) : data);
}

export function localFetch(type: string): string | { [key: string]: unknown }[] {
    const data = localStorage.getItem(type);
    return data ? typeof (data) === 'string' ? data : JSON.parse(data) : [];
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