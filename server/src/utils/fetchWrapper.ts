import qs from 'querystring';

interface FetchConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: any;
    method?: string;
    [key: string]: any;
}

export class FetchWrapper {
    private baseURL: string;
    private defaultConfig: FetchConfig;

    constructor(baseURL: string = '', defaultConfig: FetchConfig = {}) {
        this.baseURL = baseURL;
        this.defaultConfig = defaultConfig;
    }

    private mergeConfig(customConfig: FetchConfig): FetchConfig {
        return {
            ...this.defaultConfig,
            ...customConfig,
            headers: {
                ...this.defaultConfig.headers,
                ...customConfig.headers,
            },
        };
    }

    async request({ url, method = 'GET', headers = {}, params, data, ...customConfig }: FetchConfig): Promise<any> {
        const config = this.mergeConfig(customConfig);
        const fullURL = this.baseURL + url + (params ? `?${qs.stringify(params)}` : '');

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
                ...headers,
            },
            ...config,
        };
        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(fullURL, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    get(url: string, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'GET', ...config });
    }

    post(url: string, data: any, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'POST', data, ...config });
    }

    put(url: string, data: any, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'PUT', data, ...config });
    }

    delete(url: string, data?: any, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'DELETE', ...config });
    }

    patch(url: string, data: any, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'PATCH', ...config });
    }
}
