export function localSync(type: string, data: string | object): void {
    const value = typeof data === "object" ? JSON.stringify(data) : data;
    localStorage.setItem(type, value);
}

export function localFetch(type: string): string | { [key: string]: unknown } {
    const data = localStorage.getItem(type);
    if (!data) return "";
    try {
        const parsedData = JSON.parse(data);
        if (typeof parsedData === "object" && parsedData !== null) return parsedData;
    } catch {
        return data;
    }

    return data;
}


export function localRemove(type: string) {
    localStorage.removeItem(type);
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