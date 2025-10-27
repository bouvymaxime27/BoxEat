import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://api.boxeat.app' // à remplacer par ton backend plus tard
});
