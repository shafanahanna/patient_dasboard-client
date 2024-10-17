import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      if (error.response.status === 401) {
        toast.error("Unauthorized. Check your authentication credentials.");
      } else {
        toast.error(error.response.data.message || "Error fetching data.");
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
      toast.error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default instance;
