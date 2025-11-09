// src/api/client.js
import axios from 'axios';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  'https://api.boxeat.app'; // Ton futur backend

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

export default api;
