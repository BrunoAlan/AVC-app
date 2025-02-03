import axios from 'axios';
import { StorageAdapter } from '../adapters/storage-adapter';
import { router } from 'expo-router';

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
            isMobile: true,
        };
    }
    return config;
});

bookingFlowApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 403) {
            // Redirigir a la ruta de login (o la ruta que necesites)
            StorageAdapter.removeItem('token');
            router.replace('/unauthorized');
        }
        return Promise.reject(error);
    }
);

export default bookingFlowApi;
