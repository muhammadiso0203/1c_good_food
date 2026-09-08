import axios from "axios";
import { getAuthToken, encodeBase64 } from "@/lib/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    } else {
      config.headers.Authorization = `Basic ${encodeBase64("Adminsait:123")}`;
    }
  }
  return config;
});

export default api;
