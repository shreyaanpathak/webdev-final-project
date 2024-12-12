// config.ts
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
