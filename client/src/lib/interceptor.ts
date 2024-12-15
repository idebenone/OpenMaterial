import { localFetch } from '@/api/local';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localFetch("token");
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
