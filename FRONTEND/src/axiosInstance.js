
import axios from 'axios';

const axiosInstance = axios.create({// Create an axios instance
  baseURL: 'http://localhost:5000', // Your backend URL
});

// Automatically set the Authorization header for every request
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, error => {
    return Promise.reject(error);
});

export default axiosInstance;