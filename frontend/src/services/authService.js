import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is crucial for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
  }
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/authenticate', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};