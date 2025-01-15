import axios from 'axios';
import { StorageAdapter } from '../adapters/storage-adapter';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const bookingFlowApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

bookingFlowApi.interceptors.request.use(async (config) => {
    const token = await StorageAdapter.getItem('token');
    if (token) {
        config.params = {
            ...config.params,
            token,
        };
    }
    return config;
});

export default bookingFlowApi;
