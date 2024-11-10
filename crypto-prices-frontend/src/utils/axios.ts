import axios from "axios";

export const apiBaseUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export default axiosInstance;
