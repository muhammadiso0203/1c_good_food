import axios from "axios";

const username = import.meta.env.VITE_API_USERNAME ?? "";
const password = import.meta.env.VITE_API_PASSWORD ?? "";

// btoa() faqat Latin1 harflarini qo'llab-quvvatlaydi.
// Kirill harflari (АДМИНИСТРАТОР) uchun encodeURIComponent ishlatamiz.
const token = btoa(unescape(encodeURIComponent(`${username}:${password}`)));

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export default api;
