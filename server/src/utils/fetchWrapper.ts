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

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            // Throw an error with status and message for failed requests
            const errorText = await response.text();
            throw new Error(
                `HTTP error! Status: ${response.status}, Message: ${response.statusText}, Details: ${errorText}`
            );
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
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
            return await this.handleResponse(response); // Automatically parse the response
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
        return this.request({ url, method: 'DELETE', data, ...config });
    }

    patch(url: string, data: any, config: FetchConfig = {}): Promise<any> {
        return this.request({ url, method: 'PATCH', data, ...config });
    }
}
