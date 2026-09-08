import axios from "axios";
import { getAuthToken } from "@/lib/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.has("Authorization")) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Basic ${token}`;

    }
  }
  return config;
});

export default api;

