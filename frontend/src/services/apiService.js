import axios from 'axios';


const API_URL = 'http://localhost:8080/api';


const apiClient = axios.create({
    baseURL: API_URL,
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getDashboardData = async () => {
    const response = await apiClient.get('/dashboard');
    return response.data;
};


export const logActivity = async (activityData) => {
    const response = await apiClient.post('/activities', activityData);
    return response.data;
};
