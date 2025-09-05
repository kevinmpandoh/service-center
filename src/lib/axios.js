import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Pastikan API URL ada di .env
  withCredentials: true, // Jika menggunakan cookies untuk auth
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 500) {
      // Akses store global langsung (jangan dalam komponen)
      console.error("Server error:", err.response.data);
    }
    return Promise.reject(err);
  }
);

export default api;
