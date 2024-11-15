import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
