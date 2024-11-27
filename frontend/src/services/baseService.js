import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseDomain = import.meta.env.VITE_APP_BASE_URL;
const baseUrl = `${baseDomain}`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access") || '';  
  if (accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});

export default axiosInstance;