import axios from "axios";

const api = import.meta.env.VITE_API_URL;  //"http://localhost:5000/api/"  

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
});

// Add a request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (data) => axiosInstance.post("auth/login", data),
  register: (data) => axiosInstance.post("auth/register", data),
};

export const transactionApi = {
  getAll: () => axiosInstance.get("transactions"),
  create: (data) => axiosInstance.post("transactions/add", data),
  update: (id, data) => axiosInstance.put(`transactions/${id}`, data),
  delete: (id) => axiosInstance.delete(`transactions/${id}`),
};
